import './components/title';
import './components/icon';
import './components/status';

import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import style from './card.style';
import {
  defaultConfigurationColor,
  defaultConfigurationIcon,
  defaultConfigurationStatus,
  defaultConfigurationTitle,
} from './default';
import { Configuration } from './types/configuration/base';
import { Status } from './types/entities';
import { extractOkKo } from './utils/okko';
import { getStatusFromState } from './utils/sensor';
import { getTranslator } from './utils/translator';

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
      modules: {
        title: { ...defaultConfigurationTitle, ...newConfig.modules?.title },
        icon: { ...defaultConfigurationIcon, ...newConfig.modules?.icon },
        status: { ...defaultConfigurationStatus, ...newConfig.modules?.status },
      },
    };
  }

  getState(): string | undefined {
    if (!this._sensor) return undefined;

    const stateConfiguration = this.config.state;
    const { attribute } = stateConfiguration;

    return attribute ? this._sensor?.attributes[attribute] : this._sensor?.state;
  }

  getStatus(state?: string): Status {
    if (!this.config?.entity) return Status.UNKNOWN;

    const { entity } = this.config;
    const stateConfiguration = this.config.state;
    const { value } = stateConfiguration;
    const { ok, ko } = value ? extractOkKo(value) : { ok: undefined, ko: undefined };
    const entityClass = entity?.startsWith('binary_sensor')
      ? 'binary_sensor'
      : 'unknown';

    return getStatusFromState(state, ok, ko, entityClass);
  }

  getStatusColor(status: Status): string {
    const { color } = this.config;
    switch (status) {
      case Status.OK:
        return color.ok;
      case Status.KO:
        return color.ko;
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
      <div class="card">
        <uptime-card-title
          class="card_title"
          .config=${this.config?.modules?.title}
          .sensorName=${this._sensor?.attributes.friendly_name}
          .statusColor=${statusColor}
          .translator=${translator}
        ></uptime-card-title>
        <uptime-card-icon
          class="card_icon"
          .config=${this.config?.modules?.icon}
          .status=${status}
          .statusColor=${statusColor}
        ></uptime-card-icon>
        <uptime-card-status
          class="card_status"
          .config=${this.config?.modules?.status}
          .status=${status}
          .statusColor=${statusColor}
        ></uptime-card-status>
      </div>
    `;
  }

  static override styles: CSSResult = style;
}
