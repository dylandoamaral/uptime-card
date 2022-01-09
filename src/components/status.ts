import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Module } from '../mixins/module';
import { ConfigurationStatus } from '../types/configuration/status';
import { Status } from '../types/entities';
import { OkKoObject } from '../types/okko';
import { extractOkKo } from '../utils/okko';
import { getTranslator, Translator } from '../utils/translator';
import style from './title.style';

@customElement('uptime-card-status')
export class UptimeCardStatus extends Module(LitElement) {
  @property({ attribute: false })
  override config?: ConfigurationStatus;

  @property({ attribute: false })
  status?: Status;

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
    if (this.config?.adaptativeColor && this.statusColor) {
      attributes.push(`color: ${this.statusColor}`);
    }
    return attributes.join('; ');
  }

  /**
   * Get the status names to use for either ok or ko.
   *
   * @returns The names of the status to display
   */
  getStatusNames(): OkKoObject {
    if (this.config?.alias) {
      return extractOkKo(this.config?.alias);
    } else {
      return { ok: this.translator('ok'), ko: this.translator('ko') };
    }
  }

  /**
   * Get the name of the status to display.
   *
   * @returns The icon to render
   */
  getStatusName(): string {
    const { ok, ko } = this.getStatusNames();

    switch (this.status) {
      case Status.OK:
        return ok;
      case Status.KO:
        return ko;
      default:
        return this.translator('unknown');
    }
  }

  /**
   * Render the module.
   *
   * @returns The template to render
   */
  override renderModule(): TemplateResult {
    const status = this.getStatusName();
    return html`<span class="status" style=${this.additionalCss()}>${status}</span>`;
  }

  static override styles: CSSResult = style;
}
