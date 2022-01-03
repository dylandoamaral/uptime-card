import { OnOff, OnOffConfiguration } from '../types/configuration';

type OnOffValues = { on?: string; off?: string };

/**
 * Check if the value is an instance of OnOffConfiguration.
 *
 * @param object The object to check the instance of
 * @returns True if the object is an instance of OnOffConfiguration, false otherwise
 */
export function isOnOffConfiguration(object: unknown): object is OnOffConfiguration {
  return (
    object != undefined &&
    typeof object == 'object' &&
    'on' in object &&
    'off' in object
  );
}

/**
 * Extract the on and off values from the given value. The value can be a string
 * or an object with the on and off values.
 *
 * @param value The value to extract the on and off values from
 * @returns The on and off values
 */
export function extractOnOff(value?: OnOff): OnOffValues {
  if (!value) {
    return { on: undefined, off: undefined };
  } else if (isOnOffConfiguration(value)) {
    return value as OnOffValues;
  } else {
    const parts = value.split(' | ');
    if (parts.length == 2) {
      return { on: parts[0], off: parts[1] };
    } else {
      throw new Error(
        `Invalid value: ${value}, expected a string composed by two status separated by ' | '`,
      );
    }
  }
}
