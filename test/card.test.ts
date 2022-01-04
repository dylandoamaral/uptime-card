import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { UptimeCard } from '../src/card';
import { defaultConfiguration } from './fixtures';

describe('uptime-card', () => {
  it('is defined', () => {
    const el = document.createElement('uptime-card');
    expect(el).instanceOf(UptimeCard);
  });

  it('should initialised with a default configuration', async () => {
    const el = await fixture(html`<uptime-card .config=${defaultConfiguration} />`);
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
