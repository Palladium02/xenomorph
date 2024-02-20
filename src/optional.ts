import {XenomorphBasetype} from './basetype';
import {XenomorphOr} from './or';

export class XenomorphOptional<T> extends XenomorphBasetype<T | undefined> {
  private nonOptionalConstraints: XenomorphBasetype<T>;

  public constructor(constraints: XenomorphBasetype<T>) {
    super();
    this.nonOptionalConstraints = constraints;
  }

  public parse(value: unknown) {
    if (value === undefined) return value as undefined;
    this.nonOptionalConstraints.parse(value);
    return value as T;
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<T | undefined, U> {
    return new XenomorphOr(this, other);
  }

  public optional(): XenomorphOptional<T | undefined> {
    return new XenomorphOptional(this);
  }
}
