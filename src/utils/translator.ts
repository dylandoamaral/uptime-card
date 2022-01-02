import { default as enTranslations } from '../locales/en';
import { default as frTranslations } from '../locales/fr';

export type Translator = (key: string) => string;

/**
 * Give all the translations for the given language.
 *
 * @param locale The locale to use
 * @returns The translations for the given locale
 */
export function getTranslations(locale: string): Record<string, string> {
  switch (locale) {
    case 'fr':
      return frTranslations;
    default:
      return enTranslations;
  }
}

/**
 * Give the translator to use for the given locale.
 *
 * @param locale The locale to use
 * @returns The translator corresponding to a particular locale
 */
export function getTranslator(locale: string): Translator {
  const translations = getTranslations(locale);
  return function (key: string): string {
    return translations[key];
  };
}
