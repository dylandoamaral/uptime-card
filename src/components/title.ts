import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ConfigurationTitle } from '../types/configuration';
import { getTranslator, Translator } from '../utils/translator';
import style from './title.style';

@customElement('uptime-card-title')
export class UptimeCardTitle extends LitElement {
  @property({ attribute: false })
  config?: ConfigurationTitle;

  @property({ attribute: false })
  sensorName?: string;

  @property({ attribute: false })
  statusColor?: string;

  @property({ attribute: false })
  translator: Translator = getTranslator('en');

  /**
   * Add additional classes to the element.
   *
   * @returns Additionnal style to apply
   */
  additionalCss(): string {
    const attributes = [];
    if (this.config?.adaptative_color && this.statusColor) {
      attributes.push(`color: ${this.statusColor}`);
    }
    return attributes.join('; ');
  }

  /**
   * Render the component.
   *
   * @returns The template to render
   */
  override render(): TemplateResult {
    const name = this.config?.text ?? this.sensorName ?? this.translator('unknown');
    const show = this.config?.show ?? true;
    return show ? html`<h1 style=${this.additionalCss()}>${name}</h1>` : html``;
  }

  static override styles: CSSResult = style;
}
