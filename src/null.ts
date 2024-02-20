import {XenomorphBasetype} from './basetype';
import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';
import {ChainFn} from './types';

export class XenomorphNull extends XenomorphBasetype<null> {
  private chain: Array<ChainFn<null>> = [
    (value => this.isLiteral(value)) as ChainFn<null>,
  ];

  private isLiteral(value: unknown) {
    if (value !== null) throw new TypeError(`${value} is not null.`);
    return value;
  }

  public parse(value: unknown) {
    this.chain.every(fn => fn(value as null));
    return value as null;
  }

  public optional(): XenomorphOptional<null> {
    return new XenomorphOptional<null>(this);
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<null, U> {
    return new XenomorphOr(this, other);
  }
}
