import './components/title';

import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './card.style';
import { Configuration } from './types/configuration';
import { Status } from './types/entities';
import { extractOnOff } from './utils/onoff';
import { getStatusFromState } from './utils/sensor';
import { getTranslator } from './utils/translator';

@customElement('uptime-card')
export class UptimeCard extends LitElement {
  @property({ attribute: false })
  hass?: HomeAssistant;

  @property({ attribute: false })
  sensor?: HassEntity;

  @property({ attribute: false })
  config!: Configuration;

  /**
   * Called when the configuration change (rare).
   *
   * @param config The new configuration
   */
  public setConfig(newConfig: Configuration): void {
    if (!newConfig) {
      throw new Error('Invalid configuration !');
    }

    this.config = newConfig;
  }

  getState(): string | undefined {
    const stateConfiguration = this.config.state;
    const { attribute } = stateConfiguration;
    return attribute ? this.sensor?.attributes[attribute] : this.sensor?.state;
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
    switch (status) {
      case Status.ON:
        return '#00FF00';
      case Status.OFF:
        return '#FF0000';
      default:
        return '#0000FF';
    }
  }

  override render(): TemplateResult {
    const translator = getTranslator(this.hass?.language || 'en');
    const state = this.getState();
    const status = this.getStatus(state);
    const statusColor = this.getStatusColor(status);

    return html`
      <uptime-card-title
        .config=${this.config?.name}
        .sensorName=${this.sensor?.attributes.friendly_name}
        .statusColor=${statusColor}
        .translator=${translator}
      ></uptime-card-title>
    `;
  }

  static override styles: CSSResult = style;
}
