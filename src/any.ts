import {XenomorphBasetype} from './basetype';
import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';

export class XenomorphAny extends XenomorphBasetype<any> {
  public parse(value: unknown) {
    return value;
  }
  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<any, U> {
    return new XenomorphOr(this, other);
  }
  public optional(): XenomorphOptional<any> {
    return new XenomorphOptional(this);
  }
}
