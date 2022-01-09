import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { UptimeCardStatus } from '../../src/components/status';
import { defaultConfigurationStatus } from '../../src/default';
import { ConfigurationStatus } from '../../src/types/configuration/status';
import { Status } from '../../src/types/entities';

describe('uptime-card-status', () => {
  it('is defined', () => {
    const el = document.createElement('uptime-card-status');
    expect(el).instanceOf(UptimeCardStatus);
  });

  it('should return Unknown by default', async () => {
    const el = await fixture(html`<uptime-card-status />`);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return the ok alias if it exists and the status is ok', async () => {
    const configuration: ConfigurationStatus = {
      alias: 'Good | Bad',
      ...defaultConfigurationStatus,
    };
    const el = await fixture(
      html`<uptime-card-status .config=${configuration} .status=${Status.OK} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return the ko alias if it exists and the status is ko', async () => {
    const configuration: ConfigurationStatus = {
      alias: 'Good | Bad',
      ...defaultConfigurationStatus,
    };
    const el = await fixture(
      html`<uptime-card-status .config=${configuration} .status=${Status.KO} />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return the ok default text if there is no alias and the status is ok', async () => {
    const el = await fixture(
      html`<uptime-card-status
        .config=${defaultConfigurationStatus}
        .status=${Status.OK}
      />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should return the ko default text ifithere is no alias and the status is ko', async () => {
    const el = await fixture(
      html`<uptime-card-status
        .config=${defaultConfigurationStatus}
        .status=${Status.KO}
      />`,
    );
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
