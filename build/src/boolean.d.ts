import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
export declare class XenomorphBoolean extends XenomorphBasetype<boolean> {
    private chain;
    private isBoolean;
    bottom(): this;
    top(): this;
    parse(value: unknown): boolean;
    optional(): XenomorphOptional<boolean>;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<boolean, U>;
}
