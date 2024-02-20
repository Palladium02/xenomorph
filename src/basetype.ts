import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';

export abstract class XenomorphBasetype<Output> {
  public abstract parse(_: unknown): Output;
  public safeParse(value: unknown): {
    value: Output | undefined;
    success: boolean;
  } {
    try {
      return {value: this.parse(value), success: true};
    } catch {
      return {value: undefined, success: false};
    }
  }
  public abstract or<U>(_: XenomorphBasetype<U>): XenomorphOr<Output, U>;
  public abstract optional(): XenomorphOptional<Output | undefined>;
}
