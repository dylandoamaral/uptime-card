import { UptimeCardName } from '../../src/components/name';

import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { ConfigurationName } from '../../src/types/configuration';
import { getTranslator } from '../../src/utils/translator';

const defaultConfiguration = {
  show: true,
  adaptative_color: false,
};

describe('uptime-card-name', () => {
  it('is defined', () => {
    const el = document.createElement('uptime-card-name');
    expect(el).instanceOf(UptimeCardName);
  });

  it('should return Unknown by default', async () => {
    const el = await fixture(html`<uptime-card-name />`);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return the configuration text if it exists', async () => {
    const configuration: ConfigurationName = {
      text: 'Test',
      ...defaultConfiguration,
    };
    const el = await fixture(html`<uptime-card-name .config=${configuration} />`);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return nothing if configuration show is false', async () => {
    const configuration: ConfigurationName = {
      ...defaultConfiguration,
      show: false,
    };
    const el = await fixture(html` <uptime-card-name .config=${configuration} />`);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return the sensor name if it exists and there is not configuration text', async () => {
    const el = await fixture(
      html` <uptime-card-name
        .config=${defaultConfiguration}
        .sensorName=${'Sensor'}
      />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should apply translator correctly', async () => {
    const el = await fixture(
      html`<uptime-card-name .translator=${getTranslator('fr')} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should apply the adaptative color correclty', async () => {
    const configuration: ConfigurationName = {
      ...defaultConfiguration,
      adaptative_color: true,
    };
    const el = await fixture(
      html`<uptime-card-name .config=${configuration} .statusColor=${'#FF0000'} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should only apply the adaptative color if configuration adaptative is True', async () => {
    const configuration: ConfigurationName = {
      ...defaultConfiguration,
    };
    const el = await fixture(
      html`<uptime-card-name .config=${configuration} .statusColor=${'#FF0000'} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
