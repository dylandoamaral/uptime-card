import { expect } from '@open-wc/testing';

import { camelCaseToCssProperty } from '../../src/utils/text';

describe('camelCaseToCssProperty', () => {
  it('should return dash separated string instead of camel case string', () => {
    expect(camelCaseToCssProperty('myString')).to.equal('my-string');
  });

  it('should just lower case the first letter', () => {
    expect(camelCaseToCssProperty('MyString')).to.equal('my-string');
  });

  it('should do nothing if it is not camel case', () => {
    expect(camelCaseToCssProperty('my_string')).to.equal('my_string');
  });
});
