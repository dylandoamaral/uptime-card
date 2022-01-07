import { OkKo, OkKoObject } from '../types/okko';

type OkKoValues = { ok?: string; ko?: string };

/**
 * Check if the value is an instance of OkKoObject.
 *
 * @param object The object to check the instance of
 * @returns True if the object is an instance of OkKoObject, false otherwise
 */
export function isOkKoObject(object: unknown): object is OkKoObject {
  return (
    object != undefined && typeof object == 'object' && 'ok' in object && 'ko' in object
  );
}

/**
 * Extract the ok and ko values from the given value. The value can be a string
 * or an object with the ok and ko values.
 *
 * @param value The value to extract the ok and ko values from
 * @returns The ko and ok values
 */
export function extractOkKo(value?: OkKo): OkKoValues {
  if (!value) {
    return { ok: undefined, ko: undefined };
  } else if (isOkKoObject(value)) {
    return value as OkKoValues;
  } else {
    const parts = value.split(' | ');
    if (parts.length == 2) {
      return { ok: parts[0], ko: parts[1] };
    } else {
      throw new Error(
        `Invalid value: ${value}, expected a string composed by two status separated by ' | '`,
      );
    }
  }
}
