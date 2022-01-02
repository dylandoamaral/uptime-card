import { expect } from '@open-wc/testing';

import { getTranslations, getTranslator } from '../../src/utils/translator';

describe('getTranslations', () => {
  const tests = [
    { lang: 'french', locale: 'fr', translation: 'Inconnue' },
    { lang: 'english', locale: 'en', translation: 'Unknown' },
  ];

  tests.forEach(({ lang, locale, translation }) => {
    it(`should return ${lang} translation if the locale is ${locale}`, () => {
      const translations = getTranslations(locale);
      expect(translations['unknown']).to.equal(translation);
    });
  });

  it(`should return english translation if the lang is unknown or null`, () => {
    const translations = getTranslations('unknown');
    expect(translations['unknown']).to.equal('Unknown');
  });
});

describe('getTranslator', () => {
  it(`should return the good translation for a particular locale`, () => {
    const translator = getTranslator('fr');
    expect(translator('unknown')).to.equal('Inconnue');
  });
});
