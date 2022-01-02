import { expect } from '@open-wc/testing';

import { extractOnOff, isOnOffConfiguration } from '../../src/utils/onoff';

describe('isOnOffConfiguration', () => {
  it(`should return false if the object is not an OnOffConfiguration`, () => {
    const result = isOnOffConfiguration('unknown');
    expect(result).to.equal(false);
  });

  it(`should return false if the object is undefined`, () => {
    const result = isOnOffConfiguration(undefined);
    expect(result).to.equal(false);
  });

  it(`should return true if the object is undefined`, () => {
    const configuration = {
      on: 'on',
      off: 'off',
    };
    const result = isOnOffConfiguration(configuration);
    expect(result).to.equal(true);
  });
});

describe('extractOnOff', () => {
  it(`should extract OnOffValues from a string`, () => {
    const result = extractOnOff('connected | disconnected');
    expect(result.on).to.equal('connected');
    expect(result.off).to.equal('disconnected');
  });

  it(`should extract OnOffValues from a OnOffConfiguration`, () => {
    const configuration = {
      on: 'connected',
      off: 'disconnected',
    };
    const result = extractOnOff(configuration);
    expect(result.on).to.equal('connected');
    expect(result.off).to.equal('disconnected');
  });

  it(`should throw an error if the value is not well formatted`, () => {
    expect(() => {
      extractOnOff('string');
    }).to.throw(Error);
  });
});
