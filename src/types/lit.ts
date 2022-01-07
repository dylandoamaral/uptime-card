import { LitElement } from 'lit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T;
export type LitElementConstructor = Constructor<LitElement>;
