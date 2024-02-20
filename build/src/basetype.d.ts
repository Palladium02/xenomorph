import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
export declare abstract class XenomorphBasetype<Output> {
    abstract parse(_: unknown): Output;
    abstract or<U>(_: XenomorphBasetype<U>): XenomorphOr<Output, U>;
    abstract optional(): XenomorphOptional<Output | undefined>;
}
