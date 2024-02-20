import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
export declare class XenomorphNumber extends XenomorphBasetype<number> {
    private chain;
    private isNumber;
    min(n: number): this;
    max(n: number): this;
    between(lower: number, upper: number): this;
    gt(n: number): this;
    gte(n: number): this;
    lt(n: number): this;
    lte(n: number): this;
    int(): this;
    float(): this;
    even(): this;
    odd(): this;
    parse(value: unknown): number;
    optional(): XenomorphOptional<number>;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<number, U>;
}
