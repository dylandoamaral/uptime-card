import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ConfigurationName } from '../types/configuration';
import { getTranslator, Translator } from '../utils/translator';
import style from './name.style';

@customElement('uptime-card-name')
export class UptimeCardName extends LitElement {
  @property({ attribute: false })
  config?: ConfigurationName;

  @property({ attribute: false })
  sensorName?: string;

  @property({ attribute: false })
  statusColor?: string;

  @property({ attribute: false })
  translator: Translator = getTranslator('en');

  additionalCss(): string {
    const attributes = [];
    if (this.config?.adaptative_color && this.statusColor) {
      attributes.push(`color: ${this.statusColor}`);
    }
    return attributes.join('; ');
  }

  override render(): TemplateResult {
    const name = this.config?.text ?? this.sensorName ?? this.translator('unknown');
    const show = this.config?.show ?? true;
    return show ? html`<h1 style=${this.additionalCss()}>${name}</h1>` : html``;
  }

  static override styles: CSSResult = style;
}
