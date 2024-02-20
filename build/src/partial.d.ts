import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
export declare class XenomorphPartial<Schema extends Record<string, XenomorphBasetype<unknown>>, Output extends Partial<{
    [Key in keyof Schema]: XenomorphOptional<ReturnType<Schema[Key]['parse']>>;
}> = Partial<{
    [Key in keyof Schema]: XenomorphOptional<ReturnType<Schema[Key]['parse']>>;
}>> extends XenomorphBasetype<Output> {
    private chain;
    private schema;
    private shouldStrip;
    constructor(schema: Schema, shouldStrip?: boolean);
    private matchesSchema;
    strip(): void;
    shape(): Schema;
    parse(value: unknown): Output;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<Output, U>;
    optional(): XenomorphOptional<Output>;
}
