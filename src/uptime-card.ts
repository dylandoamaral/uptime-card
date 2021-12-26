/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './editor';

import { handleClick, hasConfigOrEntityChanged, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import {
  CSSResult,
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  PropertyValues,
  svg,
  TemplateResult,
} from 'lit-element';
import localForage from 'localforage/src/localforage';

import {
  CARD_VERSION,
  DEFAULT_ACTION,
  DEFAULT_ALIGNMENT,
  DEFAULT_BAR,
  DEFAULT_COLOR,
  DEFAULT_CONFIG,
  DEFAULT_ICON,
  DEFAULT_INIT,
  DEFAULT_SHOW,
  DEFAULT_TOOLTIP,
} from './const';
import style from './style';
import { ApiPoint, BarData, CacheData, Period, Point, Repartition } from './types/card';
import { CardConfig } from './types/config';
import { clip, template, unwrap, wrap } from './utils';

/* eslint no-console: 0 */
console.info(`%c uptime-card \n    ${CARD_VERSION}    `, 'color: white; background-color: #C6B145; font-weight: 700;');

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'uptime-card',
  name: 'Uptime Card',
  description: 'The uptime card show you the history of your binary sensors in a cool way.',
});

@customElement('uptime-card')
export class UptimeCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('uptime-card-editor');
  }

  public static getStubConfig(): object {
    return {};
  }

  @property({ attribute: false }) public _hass!: HomeAssistant;
  @internalProperty() private config!: CardConfig;
  @internalProperty() private sensor?: HassEntity;
  @internalProperty() private interval!: NodeJS.Timeout;
  @internalProperty() private cache!: CacheData;
  @internalProperty() private tooltip?: BarData;

  @internalProperty() private lastUpdate = 0;

  /**
   * Called when the state of Home Assistant changes (frequent).
   * @param config The new hass.
   */
  public set hass(hass: HomeAssistant) {
    const now = new Date().getTime();
    if (now - this.lastUpdate < this.config.update_interval * 1000) return;

    this._hass = hass;
    this.updateData();
    this.lastUpdate = now;
  }

  /**
   * The list of clickable actions
   */
  public get actions(): string[] {
    return ['more-info', 'url', 'navigate', 'toggle', 'call-service', 'fire-dom-event'];
  }

  /**
   * Called when the configuration change (rare).
   * @param config The new config.
   */
  public setConfig(config: CardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration !');
    }

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      color: { ...DEFAULT_COLOR, ...config.color },
      alias: { ...config.alias },
      show: { ...DEFAULT_SHOW, ...config.show },
      bar: { ...DEFAULT_BAR, ...config.bar },
      tooltip: { ...DEFAULT_TOOLTIP, ...config.tooltip },
      tap_action: { ...DEFAULT_ACTION, ...config.tap_action },
      alignment: { ...DEFAULT_ALIGNMENT, ...config.alignment },
      init: { ...DEFAULT_INIT, ...config.init },
    };

    this.updateData();
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    changedProps;
    this.updateData();
  }

  public connectedCallback(): void {
    super.connectedCallback();
  }

  public disconnectedCallback(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    super.disconnectedCallback();
  }

  /**
   * Update the cache to retrieve needed point either from home assistant API
   * https://developers.home-assistant.io/docs/api/rest/
   */
  private async updateData(): Promise<void> {
    if (this.config == undefined || this._hass == undefined) return;

    const { entity, hours_to_show, attribute } = this.config;

    if (this.sensor != this._hass.states[this.config.entity]) {
      this.sensor = this._hass.states[this.config.entity];
      if (this.sensor == undefined) return;
    }

    const status = this.getStatus();
    if (status == undefined) {
      this.cache = {
        points: [],
        lastFetched: -1,
        lastChanged: -1,
        hoursToShow: hours_to_show,
      };
      return;
    }

    const cacheKey = attribute ? `${entity}#${attribute}` : entity;
    const data: CacheData = await this.getCache(cacheKey);

    if (data != undefined) this.cache = data;

    let cache: CacheData;

    const fetchEverything = data == undefined || data.hoursToShow < hours_to_show;
    const lastFetched = fetchEverything ? this.getMinimumDate() : data.lastFetched;

    const from_date = new Date(lastFetched);
    const to_date = new Date();

    // To avoid to many API requests we limit the fetching
    // to a maximum of one time every 10 seconds
    if (to_date.getTime() - from_date.getTime() < 10000) return;

    const now = new Date().getTime();
    const fetchedPoints = await this.fetchRecent(cacheKey, from_date, to_date);
    const points = fetchEverything ? fetchedPoints : [...data.points, ...fetchedPoints];
    const index = points.findIndex(point => point.x > this.getMinimumDate());
    const usefulPoints = index == 0 ? points : points.slice(index - 1);
    const cleanedPoints = this.cleanPoints(usefulPoints);

    if (cleanedPoints.length > 0) {
      cache = {
        points: cleanedPoints,
        lastFetched: now,
        lastChanged: cleanedPoints[cleanedPoints.length - 1].x,
        hoursToShow: hours_to_show,
      };
    } else {
      const lastChanged = new Date(this.sensor.last_changed).getTime();
      const point = { x: lastChanged, y: status };

      cache = {
        points: [point],
        lastFetched: now,
        lastChanged: lastChanged,
        hoursToShow: hours_to_show,
      };
    }

    await this.setCache(cacheKey, cache);

    this.cache = cache;
  }

  /**
   * Retrieve an element from the cache.
   * @param key The key of the cached value.
   */
  async getCache(key: string): Promise<any> {
    const data: string | null = await localForage.getItem(key);
    if (data == undefined) {
      console.warn(`Can't load the key ${key} from cache.`);
      return null;
    } else return unwrap(data);
  }

  /**
   * Store a key/value element into the cache.
   * @param key The key of the cached value.
   * @param dataThe The cached value.
   */
  async setCache(key: string, data: any): Promise<any> {
    return localForage.setItem(key, wrap(data));
  }

  /**
   * Return if the current state of the entity is
   * ok, ko or undefined based on ok and ko option from
   * the configuration.
   * @param state The current state of the entity.
   */
  private isOk(state?: string): boolean | undefined {
    const { ok, ko, entity } = this.config;

    if (state == undefined) return undefined;
    else if (ok == state) return true;
    else if (ko == state) return false;
    else {
      if (ok == undefined && ko == undefined) {
        if (entity != undefined && entity.startsWith('binary_sensor')) {
          if (state == 'on') return true;
          else if (state == 'off') return false;
          return undefined;
        }
        return undefined;
      } else if (ok == undefined) return true;
      return false;
    }
  }

  /**
   * Determine the period of a future bar based on his index.
   * @param index The bar index between 0 and bar.amount - 1.
   */
  private findBarPeriod(index: number): Period {
    const { bar } = this.config;
    const millisecondsPerBar = this.getUptimeSize() / bar.amount;
    const now = new Date().getTime();
    const to = now - (bar.amount - 1 - index) * millisecondsPerBar;

    return {
      from: to - millisecondsPerBar + 1,
      to: to,
    };
  }

  /**
   * Find the repartition between ok, ko and none for a particular period
   * according to the point from the cache.
   * @param period The period to extract repartition from.
   */
  private findBarRepartition(period: Period): Repartition {
    const noneRepartition: Repartition = { ok: 0, ko: 0, none: 100 };

    if (this.cache == undefined) return noneRepartition;

    const firstPoint = this.cache.points.findIndex(point => point.x >= period.from);
    const lastPoint = this.cache.points.findIndex(point => point.x > period.to);

    let usefulPoints: Point[];

    if (this.cache.points.length == 0) return noneRepartition;
    // All points are before period.from
    else if (firstPoint == -1) usefulPoints = [this.cache.points[this.cache.points.length - 1]];
    // All points are after period.to
    else if (firstPoint == 0 && lastPoint == 0) return noneRepartition;
    else {
      const isNotFirst = firstPoint == 0 ? 0 : 1;
      const last = lastPoint == -1 ? this.cache.points.length : lastPoint;
      usefulPoints = this.cache.points.slice(firstPoint - isNotFirst, last);
    }

    const repartition: Repartition = { ok: 0, ko: 0, none: 0 };
    const total = period.to - period.from;

    for (let i = 0; i < usefulPoints.length; i++) {
      const upper = usefulPoints[i + 1] ? usefulPoints[i + 1].x : period.to;
      const lower = Math.max(usefulPoints[i].x, period.from);
      const amount = upper - lower;

      if (this.isOk(usefulPoints[i].y) == true) repartition.ok += amount;
      else if (this.isOk(usefulPoints[i].y) == false) repartition.ko += amount;
      else repartition.none += amount;
    }

    const ok = (repartition.ok / total) * 100;
    const ko = (repartition.ko / total) * 100;
    const none = 100 - (ok + ko);
    return { ok: ok, ko: ko, none: none };
  }

  /**
   * Return the total duration of the uptime bar in milliseconds.
   */
  private getUptimeSize(): number {
    const { hours_to_show } = this.config;
    return hours_to_show * 3.6e6;
  }

  /**
   * Return the minimum date of the uptime bar in epoch.
   */
  private getMinimumDate(): number {
    return new Date().getTime() - this.getUptimeSize();
  }

  /**
   * Return the color of the entity based on his status.
   * @param state The current state of the entity.
   */
  private getColor(state?: string): string {
    const { color } = this.config;

    if (this.isOk(state) == true) return color.ok;
    if (this.isOk(state) == false) return color.ko;

    return color.none;
  }

  /**
   * Return the css that should give the color a card part.
   * @param adaptive True if the color should adapt to the current status.
   * @param default_color The default color of the entity.
   */
  private getCssColor(adaptive: boolean, default_color: string): string {
    const colorCurr = adaptive == true ? this.getColor(this.getStatus()) : default_color || undefined;
    const colorCss = colorCurr ? `color: ${colorCurr};` : '';
    return colorCss;
  }

  /**
   * Get the status of the current uptime card entity or null.
   */
  private getStatus(): string | undefined {
    const { attribute } = this.config;
    const status = attribute ? this.sensor?.attributes[attribute] : this.sensor?.state;
    return status != undefined ? String(status) : undefined;
  }

  /**
   * Fetch the recent points from the home assistant api.
   * @param entity The name of the entity.
   * @param start The start date to retrieve information.
   * @param end The end date to retrieve information.
   */
  private async fetchRecent(entity: string, start: Date, end: Date): Promise<Point[]> {
    const { attribute } = this.config;
    let url = 'history/period';
    if (start) url += `/${start.toISOString()}`;
    url += `?filter_entity_id=${entity}`;
    if (end) url += `&end_time=${end.toISOString()}`;
    if (attribute == undefined) url += '&minimal_response';
    const result: ApiPoint[][] = await this._hass.callApi('GET', url);

    return result[0]
      ? result[0].map(result => {
          const status = attribute ? result.attributes[attribute] : result.state;
          return { x: new Date(result.last_changed).getTime(), y: status };
        })
      : [];
  }

  private cleanPoints(points: Point[]): Point[] {
    const cleanedPoints: Point[] = [];
    let lastPointState: string | undefined = undefined;
    for (const point of points) {
      if (point.y != lastPointState) {
        cleanedPoints.push(point);
        lastPointState = point.y;
      }
    }
    return cleanedPoints;
  }

  private handleClick(e: any): void {
    e.stopPropagation();
    if (!this.config || !this._hass) return;
    handleClick(this, this._hass, this.config, false, false);
  }

  /**
   * Compute the bar color according either to the color_thresholds if defined
   * otherwise to the ok, ko and half color.
   * @param repartition The repartition of the current bar.
   */
  private computeBarColor(repartition: Repartition): string {
    const { severity, color, color_thresholds } = this.config;

    if (repartition.none == 100) return color.none;

    if (!color_thresholds) {
      if (repartition.ok == 100) return color.ok;
      else if (repartition.ko >= severity) return color.ko;
      else return color.half;
    } else {
      const thresholds = color_thresholds.slice().sort((a, b) => a.value - b.value);
      const threshold = thresholds.find(elem => elem.value >= repartition.ok);
      return threshold ? threshold.color : color.none;
    }
  }

  protected attachBlink(target: string): string {
    const blink = this.config.blink;
    if (
      this.isOk(this.getStatus()) ||
      !blink ||
      target != blink.target ||
      (blink.target != 'card' && blink.effect == 'shadow')
    )
      return '';
    else return `animation: blink-${blink.effect} ${blink.speed}s infinite;`;
  }

  /**
   * Rendering
   */

  protected render(): TemplateResult {
    const { bar } = this.config;

    const barData = [...Array(bar.amount).keys()].map((_, idx) => {
      const period = this.findBarPeriod(idx);
      const repartition = this.findBarRepartition(period);
      return { period: period, repartition: repartition, index: idx };
    });

    return html`
      <ha-card class="flex" style="${this.attachBlink('card')}">
        ${this.renderInformation()} ${this.renderTimeline(barData)}
        ${this.renderFooter(barData.map(data => data.repartition))}
      </ha-card>
    `;
  }

  private renderInformation(): TemplateResult {
    const { tap_action } = this.config;
    return html`
      <div class="information" @click=${this.handleClick} ?hover=${this.actions.includes(tap_action.action)}>
        ${this.renderHeader()} ${this.renderStatus()}
      </div>
    `;
  }

  private renderHeader(): TemplateResult {
    const { show, alignment } = this.config;
    let headerAlignment = alignment.header;
    if (alignment.icon_first) {
      if (headerAlignment === 'right') {
        headerAlignment = 'left';
      } else if (headerAlignment === 'left') {
        headerAlignment = 'right';
      }
    }

    return show.header
      ? html`
          <div class="header flex" alignment="${headerAlignment}" ?reverse="${alignment.icon_first}">
            ${this.renderTitle()} ${this.renderIcon()}
          </div>
        `
      : html``;
  }

  private renderTitle(): TemplateResult {
    const { color, title_adaptive_color, show, title_template } = this.config;
    const text = template(title_template, {}, this.config, this.sensor);

    return show.title
      ? html`
          <div class="name" style="${this.attachBlink('title')}">
            <span style=${this.getCssColor(title_adaptive_color, color.title)}>${clip(text, 25)}</span>
          </div>
        `
      : html``;
  }

  private renderStatus(): TemplateResult {
    const { show, alignment } = this.config;

    return show.status
      ? html`
          <div class="status" alignment="${alignment.status}" ?reverse="${alignment.tooltip_first}">
            ${this.renderState()} ${this.renderTooltip()}
          </div>
        `
      : html``;
  }
  private renderState(): TemplateResult {
    const { alias, color, status_adaptive_color, status_template, ok, ko } = this.config;

    let currentStatus: string;
    if (this.sensor == undefined) {
      currentStatus = 'Unknown';
    } else {
      if (this.isOk(this.getStatus()) == true && alias.ok) currentStatus = alias.ok;
      else if (this.isOk(this.getStatus()) == false && alias.ko) currentStatus = alias.ko;
      else if (this.isOk(this.getStatus()) == undefined) currentStatus = 'Unknown';
      else currentStatus = this.getStatus() || 'Unknown';
    }

    const text = template(
      status_template,
      {
        current: currentStatus,
        ok: alias.ok || ok || '[[[ return variables.ok ]]]',
        ko: alias.ko || ko || '[[[ return variables.ko ]]]',
      },
      this.config,
      this.sensor,
    );

    return html`
      <span style="${this.getCssColor(status_adaptive_color, color.status)} ${this.attachBlink('status')}"
        >${clip(text, 25)}</span
      >
    `;
  }

  private renderTooltip(): TemplateResult {
    const { hours_to_show, tooltip, tooltip_adaptive_color, color } = this.config;
    if (this.tooltip == undefined) return html``;

    const hourOption: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: tooltip.hour24 == false,
    };
    const dayOption: Intl.DateTimeFormatOptions = {
      ...hourOption,
      weekday: 'short',
      day: 'numeric',
    };

    const locale = this._hass.language;
    const fromOption = hours_to_show <= 24 ? hourOption : dayOption;
    const fromDate = new Date(this.tooltip.period.from).toLocaleString(locale, fromOption);
    const toDate = new Date(this.tooltip.period.to).toLocaleString(locale, hourOption);

    const average = this.tooltip.repartition.ok.toFixed(2);

    const text = template(
      tooltip.template,
      {
        from_date: fromDate,
        to_date: toDate,
        average: average,
      },
      this.config,
      this.sensor,
    );

    let textColor: string = color.tooltip;
    if (tooltip_adaptive_color) {
      if (this.tooltip.repartition.ok == 100) textColor = color.ok;
      else if (this.tooltip.repartition.ko == 100) textColor = color.ko;
      else if (this.tooltip.repartition.none == 100) textColor = color.none;
      else textColor = color.half;
    }

    return html`
      <span class="tooltip" style="color: ${textColor};">${text}</span>
    `;
  }

  private renderIcon(): TemplateResult | string {
    const { icon, ko_icon, show, icon_adaptive_color, color } = this.config;
    const useKoIcon = this.isOk(this.getStatus()) == false && ko_icon;
    const currentIcon = (useKoIcon ? ko_icon : icon) || this.sensor?.attributes.icon || DEFAULT_ICON;
    const imageStyle = `background-image: url(${currentIcon}); background-size: cover;`;

    const iconDom =
      currentIcon?.startsWith('/local') || currentIcon?.startsWith('http')
        ? html`
            <div class="icon-image" style="${imageStyle} ${this.attachBlink('icon')}"></div>
          `
        : html`
            <ha-icon .icon=${currentIcon}></ha-icon>
          `;

    return show.icon
      ? html`
          <div class="icon" style="${this.getCssColor(icon_adaptive_color, color.icon)} ${this.attachBlink('icon')}">
            ${iconDom}
          </div>
        `
      : '';
  }

  private renderTimeline(barData: BarData[]): TemplateResult | string {
    const { show, bar, tooltip } = this.config;

    const isHoverable = show.status && tooltip.animation;
    console.log(isHoverable);
    const offset = 5;
    const height = isHoverable ? bar.height + offset : bar.height;
    const width = 500;
    const spacingTotalWidth = bar.spacing * (bar.amount - 1);
    const barWidth = Math.floor((width - spacingTotalWidth) / bar.amount);
    const leftTotalWidth = width - spacingTotalWidth - barWidth * bar.amount;

    if (show.timeline == false) return '';

    const bars = barData.map((data, idx) => {
      const barColor = this.computeBarColor(data.repartition);
      const isSelected = this.tooltip?.index == idx || isHoverable;
      const height = isSelected ? bar.height + offset : bar.height;
      const y = isSelected ? offset : 0;

      return this.renderBar(
        idx,
        idx * (barWidth + bar.spacing) + leftTotalWidth / 2,
        y,
        barWidth,
        height,
        bar.amount,
        barColor,
        bar.round,
        data,
      );
    });

    return html`
      <div class="timeline">
        <svg width="100%" height="100%" } viewBox="0 0 ${width} ${height}">
          ${bars}
        </svg>
      </div>
    `;
  }

  private getInitAnimationCss(
    idx: number,
    count: number,
    animation: 'none' | 'raise' | 'reveal' | 'slide',
    duration: number,
  ): string {
    const timingFunction = 'cubic-bezier(0.11, 0.95, 0.66, 1)';
    if (animation == 'none') return '';
    if (animation == 'raise') {
      return `
        transform: scaleY(0);
        animation: raise ${duration}s ${timingFunction} forwards;
      `;
    }
    if (animation == 'reveal') {
      return `
        opacity: 0;
        animation: reveal ${duration}s ${timingFunction} forwards;
      `;
    }
    const durationPerBar = duration / count;
    return `
      opacity: 0;
      animation: reveal ${durationPerBar}s ${timingFunction} forwards;
      animation-delay: ${idx * durationPerBar}s;
    `;
  }

  private renderBar(
    idx: number,
    x: number,
    y: number,
    width: number,
    height: number,
    count: number,
    color: string,
    round: number,
    data: BarData,
  ): TemplateResult {
    const { init } = this.config;
    const style = this.getInitAnimationCss(idx, count, init.animation, init.duration);

    return svg`
        <rect
            class='bar'
            x=${x}
            y=${y}
            rx=${round}
            ry=${round}
            height=${height}
            width=${width}
            fill=${color}
            style=${style}
            @mouseover=${(): BarData => (this.tooltip = data)}
            @mouseout=${(): undefined => (this.tooltip = undefined)}>
        ></rect>`;
  }

  private renderFooter(repartitions: Repartition[]): TemplateResult {
    const { show } = this.config;
    const minimalDate = this.generateMinimalDate() || 'The future';
    return show.footer && show.timeline && minimalDate
      ? html`
          <div class="footer">
            <div class="footer-text">${minimalDate}</div>
            ${show.average ? this.renderLine() : html``} ${this.renderAverage(repartitions)} ${this.renderLine()}
            <div class="footer-text">Now</div>
          </div>
        `
      : html``;
  }

  private renderAverage(repartitions: Repartition[]): TemplateResult {
    const { show, average_template } = this.config;
    const sumOk = repartitions.reduce((prev, curr) => prev + curr.ok, 0);
    const uptime = sumOk / repartitions.length;

    const text = template(average_template, { uptime: uptime }, this.config, this.sensor);

    return show.average
      ? html`
          <div ?initialized=${uptime > 0} class="footer-average">${text}</div>
        `
      : html``;
  }

  private generateMinimalDate(): string | null {
    const { hours_to_show } = this.config;
    if (hours_to_show == 0) return 'Now';
    else if (hours_to_show % 168 == 0) {
      const week = hours_to_show / 168;
      if (week == 1) {
        return `1 week ago`;
      }
      return `${week} weeks ago`;
    } else if (hours_to_show % 24 == 0) {
      const day = hours_to_show / 24;
      if (day == 1) {
        return `1 day ago`;
      }
      return `${day} days ago`;
    } else if (hours_to_show >= 1) {
      if (hours_to_show == 1) {
        return `1 hour ago`;
      }
      return `${hours_to_show} hours ago`;
    } else if (hours_to_show > 0) {
      const minute = Math.round(hours_to_show * 60);
      if (minute == 1) {
        return `1 min ago`;
      }
      return `${minute} mins ago`;
    } else {
      return null;
    }
  }

  private renderLine(): TemplateResult {
    return html`
      <div class="line"></div>
    `;
  }

  static get styles(): CSSResult {
    return style;
  }
}
