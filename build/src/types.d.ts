import { XenomorphBasetype } from './basetype';
import { XenomorphObject } from './object';
export type ChainFn<T> = (value: T) => T;
export type Infer<T extends XenomorphBasetype<unknown>> = T extends XenomorphObject<infer Schema> ? {
    [Key in keyof Schema]: ReturnType<Schema[Key]['parse']>;
} : ReturnType<T['parse']>;
