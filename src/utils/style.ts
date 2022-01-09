import {
  ConfigurationCSSProperties,
  ConfigurationStyle,
} from '../types/configuration/abstract';
import { camelCaseToCssProperty } from './text';

/**
 * Generate a style object from a configuration style object
 * @param style The configuration style object
 * @returns The style object
 */
export function generateCSS(style: ConfigurationStyle): string {
  const classes: string[] = [];
  for (const key in style) {
    classes.push(generateClass(key, style[key] as ConfigurationCSSProperties));
  }
  return classes.join('\n\n');
}

/**
 * Generate a css class from a set of css properties
 * @param className The class name
 * @param propertyDefinitions The css configurationproperties
 * @returns The css class
 */
export function generateClass(
  className: string,
  configurationProperties: ConfigurationCSSProperties,
): string {
  const properties: string[] = [];
  for (const key in configurationProperties) {
    const name = camelCaseToCssProperty(key);
    properties.push(` ${name}: ${configurationProperties[key]};`);
  }

  className = className == 'host' ? ':host' : `.${className}`;
  return `${className} {\n${properties.join('\n')}\n}`;
}
