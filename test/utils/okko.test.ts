import { expect } from '@open-wc/testing';

import { extractOkKo, isOkKoObject } from '../../src/utils/okko';

describe('isOkKoObject', () => {
  it(`should return false if the object is not an OkKoObject`, () => {
    const result = isOkKoObject('unknown');
    expect(result).to.equal(false);
  });

  it(`should return false if the object is undefined`, () => {
    const result = isOkKoObject(undefined);
    expect(result).to.equal(false);
  });

  it(`should return true if the object is undefined`, () => {
    const configuration = {
      ok: 'on',
      ko: 'off',
    };
    const result = isOkKoObject(configuration);
    expect(result).to.equal(true);
  });
});

describe('extractOkKo', () => {
  it(`should extract OkKoValues from an undefined`, () => {
    const result = extractOkKo(undefined);
    expect(result.ok).to.equal(undefined);
    expect(result.ko).to.equal(undefined);
  });

  it(`should extract OkKoValues from a string`, () => {
    const result = extractOkKo('connected | disconnected');
    expect(result.ok).to.equal('connected');
    expect(result.ko).to.equal('disconnected');
  });

  it(`should extract OkKoValues from a OkKoObject`, () => {
    const configuration = {
      ok: 'connected',
      ko: 'disconnected',
    };
    const result = extractOkKo(configuration);
    expect(result.ok).to.equal('connected');
    expect(result.ko).to.equal('disconnected');
  });

  it(`should throw an error if the value is not well formatted`, () => {
    expect(() => {
      extractOkKo('string');
    }).to.throw(Error);
  });
});
