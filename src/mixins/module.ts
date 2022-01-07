import { html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { ConfigurationModule } from '../types/configuration';
import { Constructor, LitElementConstructor as LEC } from '../types/lit';

export interface Module {
  config?: ConfigurationModule;
  renderModule(): TemplateResult;
}

export const Module = <Base extends LEC>(base: Base): Base & Constructor<Module> => {
  class ModuleElement extends base implements Module {
    @property() config?: ConfigurationModule;

    /**
     * Render the module.
     *
     * @returns The template to render
     */
    renderModule(): TemplateResult {
      return html``;
    }

    /**
     * Render the element.
     *
     * @returns The template to render
     */
    override render(): TemplateResult {
      const show = this.config?.show ?? true;
      return show ? this.renderModule() : html``;
    }
  }

  return ModuleElement;
};
