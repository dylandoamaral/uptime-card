import { expect, fixture } from '@open-wc/testing';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Module } from '../../src/mixins/module';
import { ConfigurationModule } from '../../src/types/configuration';

@customElement('test-module')
class TestModule extends Module(LitElement) {
  override renderModule(): TemplateResult {
    return html`<h1>Hello</h1>`;
  }
}

describe('module', () => {
  it('is defined', () => {
    const el = document.createElement('test-module');
    expect(el).instanceOf(TestModule);
  });

  it('should return the content if show is true', async () => {
    const config: ConfigurationModule = { show: true };
    const el = await fixture(html`<test-module .config=${config} />`);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should not return the content if show is true', async () => {
    const config: ConfigurationModule = { show: false };
    const el = await fixture(html`<test-module .config=${config} />`);
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
