import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ConfigurationIcon } from '../types/configuration';
import { Status } from '../types/entities';
import { extractOkKo } from '../utils/okko';
import style from './icon.style';

@customElement('uptime-card-icon')
export class UptimeCardIcon extends LitElement {
  @property({ attribute: false })
  config?: ConfigurationIcon;

  @property({ attribute: false })
  status?: string;

  @property({ attribute: false })
  statusColor?: string;

  /**
   * Get the icon depending of the state of the sensor
   *
   * @returns The icon to render
   */
  getIcon(): string {
    const defaultIcon = 'mdi:heart';
    const { ok, ko } = extractOkKo(this.config?.value);

    switch (this.status) {
      case Status.OK:
        return ok ?? defaultIcon;
      case Status.KO:
        return ko ?? defaultIcon;
      default:
        return defaultIcon;
    }
  }

  /**
   * Check if the icon should be rendered as an image or an ha icon.
   *
   * @param icon The icon to check
   * @returns True if the icon is an image, false otherwise
   */
  isImage(icon: string): boolean {
    const regex =
      /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    return icon.startsWith('/local') || regex.test(icon);
  }

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
    const show = this.config?.show ?? true;
    const icon = this.getIcon();
    const imageStyle = `background-image: url(${icon}); background-size: cover;`;

    const res = this.isImage(icon)
      ? html`<div class="icon" style="${this.additionalCss() + imageStyle}" />`
      : html`<ha-icon class="icon" style=${this.additionalCss()} icon=${icon} />`;

    return show ? res : html``;
  }

  static override styles: CSSResult = style;
}
