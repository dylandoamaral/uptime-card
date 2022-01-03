import './components/title';

import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import style from './card.style';
import { Configuration } from './types/configuration';
import { Status } from './types/entities';
import { extractOnOff } from './utils/onoff';
import { getStatusFromState } from './utils/sensor';
import { getTranslator } from './utils/translator';
import { defaultConfigurationColor, defaultConfigurationTitle } from './default';

@customElement('uptime-card')
export class UptimeCard extends LitElement {
  @property({ attribute: false })
  config!: Configuration;

  @state()
  private _sensor?: HassEntity;

  @state()
  private _hass?: HomeAssistant;

  /**
   * Called when the state of Home Assistant changes (frequent).
   *
   * @param config The new hass.
   */
  set hass(newHass: HomeAssistant) {
    if (!newHass) return;

    this._hass = newHass;

    if (this.config?.entity) {
      this._sensor = this._hass.states[this.config.entity];
    }
  }

  /**
   * Called when the configuration change (rare).
   *
   * @param config The new configuration
   */
  public setConfig(newConfig: Configuration): void {
    if (!newConfig) {
      throw new Error('Invalid configuration !');
    }

    this.config = {
      ...newConfig,
      color: { ...defaultConfigurationColor, ...newConfig.color },
      title: { ...defaultConfigurationTitle, ...newConfig.title },
    };
  }

  getState(): string | undefined {
    if (!this._sensor) return undefined;

    const stateConfiguration = this.config.state;
    const { attribute } = stateConfiguration;

    return attribute ? this._sensor?.attributes[attribute] : this._sensor?.state;
  }

  getStatus(state?: string): Status {
    const { entity } = this.config;
    const stateConfiguration = this.config.state;
    const { value } = stateConfiguration;
    const { on, off } = extractOnOff(value);
    const entityClass = entity?.startsWith('binary_sensor')
      ? 'binary_sensor'
      : 'unknown';

    return getStatusFromState(state, on, off, entityClass);
  }

  getStatusColor(status: Status): string {
    const { color } = this.config;
    switch (status) {
      case Status.ON:
        return color.on;
      case Status.OFF:
        return color.off;
      default:
        return color.unknown;
    }
  }

  override render(): TemplateResult {
    const translator = getTranslator(this.hass?.locale?.language || 'en');
    const state = this.getState();
    const status = this.getStatus(state);
    const statusColor = this.getStatusColor(status);

    return html`
      <uptime-card-title
        .config=${this.config?.title}
        .sensorName=${this._sensor?.attributes.friendly_name}
        .statusColor=${statusColor}
        .translator=${translator}
      ></uptime-card-title>
    `;
  }

  static override styles: CSSResult = style;
}
