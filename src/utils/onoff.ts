import { OnOff, OnOffConfiguration } from '../types/configuration';

type OnOffValues = { on: string; off: string };

export function isOnOffConfiguration(object: unknown): object is OnOffConfiguration {
  return (
    object != undefined &&
    typeof object == 'object' &&
    'on' in object &&
    'off' in object
  );
}

export function extractOnOff(value: OnOff): OnOffValues {
  if (isOnOffConfiguration(value)) {
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
