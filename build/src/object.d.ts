import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
import { XenomorphPartial } from './partial';
export declare class XenomorphObject<Schema extends Record<string, XenomorphBasetype<unknown>>, Output extends {
    [Key in keyof Schema]: ReturnType<Schema[Key]['parse']>;
} = {
    [Key in keyof Schema]: ReturnType<Schema[Key]['parse']>;
}> extends XenomorphBasetype<Output> {
    private chain;
    private schema;
    private shouldStrip;
    constructor(schema: Schema);
    private matchesSchema;
    strip(): this;
    partial(): XenomorphPartial<Schema, Partial<{ [Key in keyof Schema]: XenomorphOptional<ReturnType<Schema[Key]["parse"]>>; }>>;
    merge<ToMergeWith extends Record<string, XenomorphBasetype<unknown>>>(schema: XenomorphObject<ToMergeWith>): XenomorphObject<ToMergeWith & Schema, ToMergeWith & Schema extends infer T extends Record<string, XenomorphBasetype<unknown>> ? { [Key in keyof T]: ReturnType<(ToMergeWith & Schema)[Key]["parse"]>; } : never>;
    shape(): Schema;
    parse(value: unknown): Output;
    optional(): XenomorphOptional<Output>;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<Output, U>;
}
