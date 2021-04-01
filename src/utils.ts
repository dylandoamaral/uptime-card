/* eslint-disable @typescript-eslint/no-explicit-any */
export const wrap = (object: any): string => JSON.stringify(object);

export const unwrap = (object: string): any => JSON.parse(object);

export const template = (template: string, variables: { [id: string]: string }): string => {
    for (const [key, value] of Object.entries(variables)) {
        template = template.replace(key, value);
    }
    return template;
};
