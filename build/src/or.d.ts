import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
export declare class XenomorphOr<L, R> extends XenomorphBasetype<L | R> {
    private left;
    private right;
    constructor(left: XenomorphBasetype<L>, right: XenomorphBasetype<R>);
    parse(value: unknown): L | R;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<L | R, U>;
    optional(): XenomorphOptional<L | R | undefined>;
}
