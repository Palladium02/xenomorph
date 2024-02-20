import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
export declare class XenomorphArray<T> extends XenomorphBasetype<Array<T>> {
    private type;
    private chain;
    constructor(type: XenomorphBasetype<T>);
    private isOfType;
    min(n: number): this;
    max(n: number): this;
    parse(value: unknown): T[];
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<T[], U>;
    optional(): XenomorphOptional<T[]>;
}
