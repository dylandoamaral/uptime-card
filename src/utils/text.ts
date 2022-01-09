/**
 * Convert a camel case string into a dash separated string
 * @param property The camel case string to convert
 * @returns The dash separated string
 */
export function camelCaseToCssProperty(property: string): string {
  return property
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}
