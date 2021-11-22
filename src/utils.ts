/* eslint-disable @typescript-eslint/no-explicit-any */
import { HassEntity } from 'home-assistant-js-websocket';

import { CardConfig } from './types/config';

export const wrap = (object: any): string => JSON.stringify(object);

export const unwrap = (object: string): any => JSON.parse(object);

export const clip = (text: string, max: number): string => (text.length > max ? text.slice(0, max) + '...' : text);
/**
 * Transform a template string into a human readable string using variables to interpolate with and sensor
 * values.
 *
 * @param template The template to create the string.
 * @param variables The variables ton interpolate with.
 * @param configuration The current configuration of the card.
 * @param entity The current card sensor.
 */
export const template = (
  template: string,
  variables: { [id: string]: any },
  configuration: CardConfig,
  entity?: HassEntity,
): string => {
  const regex = /\[\[\[ (.*?) \]\]\]/g;
  const functions = [...template.matchAll(regex)].map(values => values[1]);

  functions.forEach(f => {
    const from = `[[[ ${f} ]]]`;
    try {
      const to = new Function('entity', 'variables', 'configuration', f);
      template = template.replace(from, to(entity, variables, configuration));
    } catch {
      template = template.replace(from, 'error');
    }
  });

  return template;
};
