import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Module } from '../mixins/module';
import { ConfigurationTitle } from '../types/configuration/title';
import { getTranslator, Translator } from '../utils/translator';
import style from './title.style';

@customElement('uptime-card-title')
export class UptimeCardTitle extends Module(LitElement) {
  @property({ attribute: false })
  override config?: ConfigurationTitle;

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
   * Render the module.
   *
   * @returns The template to render
   */
  override renderModule(): TemplateResult {
    const name = this.config?.text ?? this.sensorName ?? this.translator('unknown');
    return html`<h1 class="title" style=${this.additionalCss()}>${name}</h1>`;
  }

  static override styles: CSSResult = style;
}
