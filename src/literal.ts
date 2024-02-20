import {XenomorphBasetype} from './basetype';
import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';
import {ChainFn} from './types';

export class XenomorphLiteral<T> extends XenomorphBasetype<T> {
  private chain: Array<ChainFn<T>> = [
    (value => this.isLiteral(value)) as ChainFn<T>,
  ];
  private literal: T;

  public constructor(literal: T) {
    super();
    this.literal = literal;
  }

  private isLiteral(value: unknown) {
    if (value !== this.literal)
      throw new TypeError(`${value} is not equal to ${this.literal}.`);
    return value;
  }

  public parse(value: unknown) {
    this.chain.every(fn => fn(value as T));
    return value as T;
  }

  public optional(): XenomorphOptional<T> {
    return new XenomorphOptional<T>(this);
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<T, U> {
    return new XenomorphOr(this, other);
  }
}
