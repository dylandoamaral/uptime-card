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
 * @param sensor The current card sensor.
 */
export const template = (template: string, variables: { [id: string]: string }, sensor?: HassEntity): string => {
    const regex = /\[\[ ([a-zA-Z0-9_.-]*) \]\]/g;
    const potentialInterpolations = [...template.matchAll(regex)].map(values => values[1]);

    if (potentialInterpolations == undefined) return template;

    potentialInterpolations.forEach(interpolation => {
        const from = `[[ ${interpolation} ]]`;
        const to = variables[interpolation];

        if (to != undefined) template = template.replace(from, to);
        else if (sensor != undefined && interpolation.startsWith(sensor.entity_id)) {
            if (sensor.entity_id == interpolation) template = template.replace(from, sensor.entity_id);
            else {
                const path = interpolation.replace(sensor.entity_id, '');
                const keys = path.split('.').slice(1);

                let sensorInformation: HassEntity | undefined | string = sensor;
                for (const key of keys) {
                    if (sensorInformation != undefined && sensorInformation[key] != undefined) {
                        sensorInformation = sensorInformation[key];
                    } else {
                        sensorInformation = undefined;
                        break;
                    }
                }
                if (sensorInformation != undefined && typeof sensorInformation !== 'object')
                    template = template.replace(from, String(sensorInformation));
            }
        }
    });

    return template;
};
