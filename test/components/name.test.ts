import { UptimeCardName } from '../../src/components/name';

import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

describe('uptime-card-name', () => {
  it('is defined', () => {
    const el = document.createElement('uptime-card-name');
    expect(el).instanceOf(UptimeCardName);
  });
  it('should return Unknown by default', async () => {
    const el = await fixture(html`<uptime-card-name></uptime-card-name>`);
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
