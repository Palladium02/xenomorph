import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
export declare class XenomorphAny extends XenomorphBasetype<any> {
    parse(value: unknown): unknown;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<any, U>;
    optional(): XenomorphOptional<any>;
}
