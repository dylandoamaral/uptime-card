import { expect, fixture, html } from '@open-wc/testing';

describe('uptime-card-name', () => {
  it('should return Unknown by default', async () => {
    const el = await fixture(html`<uptime-card-name></uptime-card-name>`);
    expect(el).dom.to.equalSnapshot();
  });
});
