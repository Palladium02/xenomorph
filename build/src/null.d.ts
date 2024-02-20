import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
export declare class XenomorphNull extends XenomorphBasetype<null> {
    private chain;
    private isLiteral;
    parse(value: unknown): null;
    optional(): XenomorphOptional<null>;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<null, U>;
}
