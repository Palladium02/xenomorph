import { XenomorphBasetype } from './basetype';
import { XenomorphOr } from './or';
export declare class XenomorphOptional<T> extends XenomorphBasetype<T | undefined> {
    private nonOptionalConstraints;
    constructor(constraints: XenomorphBasetype<T>);
    parse(value: unknown): T | undefined;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<T | undefined, U>;
    optional(): XenomorphOptional<T | undefined>;
}
