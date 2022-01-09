import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { UptimeCardIcon } from '../../src/components/icon';
import { defaultConfigurationIcon } from '../../src/default';
import { ConfigurationIcon } from '../../src/types/configuration/icon';
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
      value: 'https://tinyurl.com/5xpp8zc5 | https://tinyurl.com/5xpp8zc5',
      ...defaultConfigurationIcon,
    };
    const el = await fixture(
      html`<uptime-card-icon .config=${configuration} .status=${Status.OK} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
