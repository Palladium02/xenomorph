import {XenomorphBasetype} from './basetype';
import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';
import {ChainFn} from './types';

export class XenomorphArray<T> extends XenomorphBasetype<Array<T>> {
  private type: XenomorphBasetype<T>;
  private chain: Array<ChainFn<Array<T>>> = [value => this.isOfType(value)];

  public constructor(type: XenomorphBasetype<T>) {
    super();
    this.type = type;
  }

  private isOfType(value: Array<T>) {
    if (!Array.isArray(value)) throw new TypeError();
    return value.map(v => this.type.parse(v));
  }

  public min(n: number) {
    this.chain.push(value => {
      if (value.length < n)
        throw new TypeError(
          `The given array is too short expected a minimum length of ${n} got ${value.length}.`
        );
      return value;
    });
    return this;
  }

  public max(n: number) {
    this.chain.push(value => {
      if (value.length > n)
        throw new TypeError(
          `The given array is too long expected a maximum length of ${n} got ${value.length}`
        );
      return value;
    });
    return this;
  }

  public parse(value: unknown): T[] {
    return this.chain.map(fn => fn(value as Array<T>)) as Array<T>;
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<T[], U> {
    return new XenomorphOr(this, other);
  }

  public optional(): XenomorphOptional<T[]> {
    return new XenomorphOptional(this);
  }
}
