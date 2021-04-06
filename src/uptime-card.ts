/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './editor';

import { hasConfigOrEntityChanged, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
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
    DEFAULT_BAR,
    DEFAULT_COLOR,
    DEFAULT_CONFIG,
    DEFAULT_ICON,
    DEFAULT_SHOW,
    DEFAULT_TOOLTIP,
} from './const';
import style from './style';
import { ApiPoint, BarData, CacheData, Period, Point, Repartition } from './types/card';
import { CardConfig } from './types/config';
import { template, unwrap, wrap } from './utils';

/* eslint no-console: 0 */
console.info(`%c Uptime card version ${CARD_VERSION} `, 'color: orange; font-weight: bold; background: black');

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

    /**
     * Called when the state of Home Assistant changes (frequent).
     * @param config The new hass.
     */
    public set hass(hass: HomeAssistant) {
        this._hass = hass;
        this.sensor = hass.states[this.config.entity];

        this.updateData();
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
        if (this.config.update_interval) {
            this.interval = setInterval(() => this.updateData(), this.config.update_interval * 1000);
        }
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

        const { entity, hours_to_show } = this.config;
        this.sensor = this._hass.states[this.config.entity];

        if (this.sensor == undefined) return;

        const data: CacheData = await this.getCache(entity);

        if (data != undefined) this.cache = data;

        const now = new Date().getTime();
        let cache: CacheData;

        const fetchEverything = data == undefined || data.hoursToShow < hours_to_show;
        const lastFetched = fetchEverything ? this.getMinimumDate() : data.lastFetched;

        const from_date = new Date(lastFetched);
        const to_date = new Date();

        // To avoid to many API requests we limit the fetching
        // to a maximum of one time every 10 seconds
        if (to_date.getTime() - from_date.getTime() < 10000) return;

        const fetchedPoints = await this.fetchRecent(entity, from_date, to_date);
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
            const point = { x: lastChanged, y: this.sensor.state };

            cache = {
                points: [point],
                lastFetched: now,
                lastChanged: lastChanged,
                hoursToShow: hours_to_show,
            };
        }

        await this.setCache(entity, cache);

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
        const colorCurr = adaptive == true ? this.getColor(this.sensor?.state) : default_color || undefined;
        const colorCss = colorCurr ? `color: ${colorCurr};` : '';
        return colorCss;
    }

    /**
     * Fetch the recent points from the home assistant api.
     * @param entity The name of the entity.
     * @param start The start date to retrieve information.
     * @param end The end date to retrieve information.
     */
    private async fetchRecent(entity: string, start: Date, end: Date): Promise<Point[]> {
        let url = 'history/period';
        if (start) url += `/${start.toISOString()}`;
        url += `?filter_entity_id=${entity}`;
        if (end) url += `&end_time=${end.toISOString()}`;
        url += '&minimal_response';
        const result: ApiPoint[][] = await this._hass.callApi('GET', url);

        return result[0]
            ? result[0].map(result => {
                  return { x: new Date(result.last_changed).getTime(), y: result.state };
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
        console.log('click');
        e.stopPropagation();
        const { tap_action } = this.config;
        const entityId = this.sensor?.entity_id;
        let event;

        switch (tap_action.action) {
            case 'more-info': {
                if (entityId == undefined) return;
                event = new Event('hass-more-info', { composed: true });
                event.detail = { entityId };
                this.dispatchEvent(event);
                break;
            }
            case 'url': {
                if (tap_action.url == undefined) return;
                window.open(tap_action.url, '_blank')?.focus();
            }
        }
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
            <ha-card class="flex" @click=${this.handleClick}>
                ${this.renderHeader()} ${this.renderStatus()} ${this.renderTimeline(barData)}
                ${this.renderFooter(barData.map(data => data.repartition))}
            </ha-card>
        `;
    }

    private renderHeader(): TemplateResult | string {
        const { show } = this.config;

        return show.header
            ? html`
                  <div class="header flex">
                      ${this.renderTitle()} ${this.renderIcon()}
                  </div>
              `
            : '';
    }

    private renderTitle(): TemplateResult {
        const { name, color, title_adaptive_color, show } = this.config;

        return show.title
            ? html`
                  <div class="name">
                      <span style=${this.getCssColor(title_adaptive_color, color.title)}>${name}</span>
                  </div>
              `
            : html``;
    }

    private renderStatus(): TemplateResult {
        const { show } = this.config;

        return show.status
            ? html`
                  <div class="status">
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
            if (this.isOk(this.sensor.state) == true && alias.ok) currentStatus = alias.ok;
            else if (this.isOk(this.sensor.state) == false && alias.ko) currentStatus = alias.ko;
            else if (this.isOk(this.sensor.state) == undefined) currentStatus = 'Unknown';
            else currentStatus = this.sensor.state;
        }

        const text = template(
            status_template,
            {
                current: currentStatus,
                ok: alias.ok || ok || '[[ ok ]]',
                ko: alias.ko || ko || '[[ ko ]]',
            },
            this.sensor,
        );

        return html`
            <span style=${this.getCssColor(status_adaptive_color, color.status)}>${text}</span>
        `;
    }

    private renderTooltip(): TemplateResult {
        const { hours_to_show, tooltip, tooltip_adaptive_color, color } = this.config;
        if (this.tooltip == undefined) return html``;
        const locale = this._hass.language || 'en-US';
        const hourOption = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: tooltip.hour24 == false,
        };
        const dayOption = {
            ...hourOption,
            weekday: 'short',
            day: 'numeric',
        };
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
        const { icon, show, icon_adaptive_color, color } = this.config;
        const currentIcon = icon || this.sensor?.attributes.icon || DEFAULT_ICON;

        return show.icon
            ? html`
                  <div class="icon flex" style=${this.getCssColor(icon_adaptive_color, color.icon)}>
                      <ha-icon .icon=${currentIcon}></ha-icon>
                  </div>
              `
            : '';
    }

    private renderTimeline(barData: BarData[]): TemplateResult | string {
        const { show, color, bar, severity, tooltip } = this.config;

        const offset = 5;
        const height = bar.height + offset;
        const width = 500;
        const spacingTotalWidth = bar.spacing * (bar.amount - 1);
        const barWidth = Math.floor((width - spacingTotalWidth) / bar.amount);
        const leftTotalWidth = width - spacingTotalWidth - barWidth * bar.amount;

        if (show.timeline == false) return '';

        const bars = barData.map((data, idx) => {
            let barColor: string;
            if (data.repartition.none == 100) barColor = color.none;
            else if (data.repartition.ok == 100) barColor = color.ok;
            else if (data.repartition.ko >= severity) barColor = color.ko;
            else barColor = color.half;

            const shouldNotBeSelected =
                this.tooltip?.index != idx || show.status == false || tooltip.animation == false;
            const height = shouldNotBeSelected ? bar.height : bar.height + offset;
            const y = shouldNotBeSelected ? offset : 0;

            return this.renderBar(
                idx * (barWidth + bar.spacing) + leftTotalWidth / 2,
                y,
                barWidth,
                height,
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

    private renderBar(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
        round: number,
        data: BarData,
    ): TemplateResult {
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
            @mouseover=${(): BarData => (this.tooltip = data)}
            @mouseout=${(): undefined => (this.tooltip = undefined)}>
        ></rect>`;
    }

    private renderFooter(repartitions: Repartition[]): TemplateResult {
        const { show } = this.config;

        return show.footer && show.timeline
            ? html`
                  <div class="footer">
                      <div class="footer-text">${this.generateMinimalDate()}</div>
                      ${show.average ? this.renderLine() : html``} ${this.renderAverage(repartitions)}
                      ${this.renderLine()}
                      <div class="footer-text">Now</div>
                  </div>
              `
            : html``;
    }

    private renderAverage(repartitions: Repartition[]): TemplateResult {
        const { show, average_text } = this.config;
        const sumOk = repartitions.reduce((prev, curr) => prev + curr.ok, 0);
        const uptime = (sumOk / repartitions.length).toFixed(2);

        return show.average
            ? html`
                  <div class="footer-text">${uptime}${average_text}</div>
              `
            : html``;
    }

    private generateMinimalDate(): string {
        const { hours_to_show } = this.config;
        if (hours_to_show == 0) return 'Now';
        else if (hours_to_show % 168 == 0) {
            const week = hours_to_show / 168;
            if (week == 1) {
                return `${week} week ago`;
            }
            return `${week} weeks ago`;
        } else if (hours_to_show % 24 == 0) {
            const day = hours_to_show / 24;
            if (day == 1) {
                return `${day} day ago`;
            }
            return `${day} days ago`;
        } else {
            if (hours_to_show == 1) {
                return `${hours_to_show} hour ago`;
            }
            return `${hours_to_show} hours ago`;
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
