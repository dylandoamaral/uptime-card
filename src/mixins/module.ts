import { html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { ConfigurationModule } from '../types/configuration/abstract';
import { Constructor, LitElementConstructor as LEC } from '../types/lit';
import { generateCSS } from '../utils/style';

export interface Module {
  config?: ConfigurationModule;
  renderModule(): TemplateResult;
  renderStyle(): TemplateResult;
}

export const Module = <Base extends LEC>(base: Base): Base & Constructor<Module> => {
  class ModuleElement extends base implements Module {
    @property({ attribute: false }) config?: ConfigurationModule;

    /**
     * Render the module.
     *
     * @returns The template to render
     */
    renderModule(): TemplateResult {
      return html``;
    }

    /**
     * Render the additional style of the module coming from the configuration.
     *
     * @returns The template to render
     */
    renderStyle(): TemplateResult {
      return this.config?.style
        ? html`<style>
            ${generateCSS(this.config.style)}
          </style>`
        : html``;
    }

    /**
     * Render the element.
     *
     * @returns The template to render
     */
    override render(): TemplateResult {
      const show = this.config?.show ?? true;

      if (!show) return html``;

      return html`${this.renderStyle()}${this.renderModule()}`;
    }
  }

  return ModuleElement;
};
