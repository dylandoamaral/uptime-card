import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { UptimeCardIcon } from '../../src/components/icon';
import { defaultConfigurationIcon } from '../../src/default';
import { ConfigurationIcon } from '../../src/types/configuration';
import { Status } from '../../src/types/entities';

describe('uptime-card-icon', () => {
  it('is defined', () => {
    const el = document.createElement('uptime-card-icon');
    expect(el).instanceOf(UptimeCardIcon);
  });

  it('should return mdi:heart icon by default', async () => {
    const el = await fixture(html`<uptime-card-icon />`);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return the ok icon if it exists and the status is ok', async () => {
    const configuration: ConfigurationIcon = {
      value: 'mdi:weather-sunny | mdi:weather-night',
      ...defaultConfigurationIcon,
    };
    const el = await fixture(
      html`<uptime-card-icon .config=${configuration} .status=${Status.OK} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return the ko icon if it exists and the status is ko', async () => {
    const configuration: ConfigurationIcon = {
      value: 'mdi:weather-sunny | mdi:weather-night',
      ...defaultConfigurationIcon,
    };
    const el = await fixture(
      html`<uptime-card-icon .config=${configuration} .status=${Status.KO} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should detect if the icon is an image', async () => {
    const configuration: ConfigurationIcon = {
      value: 'shorturl.at/xzI34 | shorturl.at/xzI34',
      ...defaultConfigurationIcon,
    };
    const el = await fixture(
      html`<uptime-card-icon .config=${configuration} .status=${Status.OK} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
