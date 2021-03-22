/* eslint-disable @typescript-eslint/no-explicit-any */
export const wrap = (object: any): string => JSON.stringify(object)

export const unwrap = (object: string): any => JSON.parse(object)
