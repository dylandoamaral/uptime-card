/* eslint-disable @typescript-eslint/no-explicit-any */
import { HassEntity } from 'home-assistant-js-websocket';

export const wrap = (object: any): string => JSON.stringify(object);

export const unwrap = (object: string): any => JSON.parse(object);

export const clip = (text: string, max: number): string => (text.length > max ? text.slice(0, max) + '...' : text);
/**
 * Transform a template string into a human readable string using variables to interpolate with and sensor
 * values.
 *
 * @param template The template to create the string.
 * @param variables The variables ton interpolate with.
 * @param entity The current card sensor.
 */
export const template = (template: string, variables: { [id: string]: any }, entity?: HassEntity): string => {
    const regex = /\[\[ (.*?) \]\]/g;
    const functions = [...template.matchAll(regex)].map(values => values[1]);

    functions.forEach(f => {
        const from = `[[ ${f} ]]`;
        try {
            const to = new Function('entity', 'variables', f);
            template = template.replace(from, to(entity, variables));
        } catch {
            template = template.replace(from, 'error');
        }
    });

    return template;
};
