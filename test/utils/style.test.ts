import { expect } from '@open-wc/testing';

import {
  ConfigurationCSSProperties,
  ConfigurationStyle,
} from '../../src/types/configuration/abstract';
import { generateClass, generateCSS } from '../../src/utils/style';

export interface ConfigurationTestStyle extends ConfigurationStyle {
  test: ConfigurationCSSProperties;
}

describe('generateCSS', () => {
  it('should generate a correct css', async () => {
    const configuration: ConfigurationTestStyle = {
      test: {
        color: 'red',
        backgroundColor: 'blue',
      },
    };

    await expect(generateCSS(configuration)).to.equalSnapshot();
  });

  it('can generate a css with multiple class', async () => {
    const configuration: ConfigurationTestStyle = {
      test: {
        color: 'red',
        backgroundColor: 'blue',
      },
      test_subtest: {
        fontSize: '15px',
      },
    };

    await expect(generateCSS(configuration)).to.equalSnapshot();
  });
});

describe('generateClass', () => {
  it('should generate a correct class css', async () => {
    const configuration: ConfigurationCSSProperties = {
      color: 'red',
      backgroundColor: 'blue',
    };

    await expect(generateClass('test', configuration)).to.equalSnapshot();
  });
});
