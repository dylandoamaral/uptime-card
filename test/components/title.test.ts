import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { UptimeCardTitle } from '../../src/components/title';
import { defaultConfigurationTitle } from '../../src/default';
import { ConfigurationTitle } from '../../src/types/configuration/title';
import { getTranslator } from '../../src/utils/translator';

describe('uptime-card-title', () => {
  it('is defined', () => {
    const el = document.createElement('uptime-card-title');
    expect(el).instanceOf(UptimeCardTitle);
  });

  it('should return Unknown by default', async () => {
    const el = await fixture(html`<uptime-card-title />`);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return the configuration text if it exists', async () => {
    const configuration: ConfigurationTitle = {
      text: 'Test',
      ...defaultConfigurationTitle,
    };
    const el = await fixture(html`<uptime-card-title .config=${configuration} />`);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return the sensor name if it exists and there is not configuration text', async () => {
    const el = await fixture(
      html` <uptime-card-title
        .config=${defaultConfigurationTitle}
        .sensorName=${'Sensor'}
      />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should apply translator correctly', async () => {
    const el = await fixture(
      html`<uptime-card-title .translator=${getTranslator('fr')} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should apply the adaptative color correclty', async () => {
    const configuration: ConfigurationTitle = {
      ...defaultConfigurationTitle,
      adaptative_color: true,
    };
    const el = await fixture(
      html`<uptime-card-title .config=${configuration} .statusColor=${'#FF0000'} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should only apply the adaptative color if configuration adaptative is True', async () => {
    const configuration: ConfigurationTitle = {
      ...defaultConfigurationTitle,
    };
    const el = await fixture(
      html`<uptime-card-title .config=${configuration} .statusColor=${'#FF0000'} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
