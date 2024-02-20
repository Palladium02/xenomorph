import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
export declare class XenomorphLiteral<T> extends XenomorphBasetype<T> {
    private chain;
    private literal;
    constructor(literal: T);
    private isLiteral;
    parse(value: unknown): T;
    optional(): XenomorphOptional<T>;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<T, U>;
}
