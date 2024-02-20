import {XenomorphBasetype} from './basetype';
import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';
import {ChainFn} from './types';

export class XenomorphBoolean extends XenomorphBasetype<boolean> {
  private chain: Array<ChainFn<boolean>> = [
    (value => this.isBoolean(value)) as ChainFn<boolean>,
  ];

  private isBoolean(value: unknown) {
    if (typeof value !== 'boolean')
      throw new TypeError(
        `${value} is of type ${typeof value} but expected it to be of type boolean.`
      );
    return value;
  }

  public bottom() {
    this.chain.push(value => {
      if (value) throw new TypeError(`${value} is not false.`);
      return value;
    });
    return this;
  }

  public top() {
    this.chain.push(value => {
      if (!value) throw new TypeError(`${value} is not true.`);
      return value;
    });
    return this;
  }

  public parse(value: unknown) {
    this.chain.every(fn => fn(value as boolean));
    return value as boolean;
  }

  public optional(): XenomorphOptional<boolean> {
    return new XenomorphOptional<boolean>(this);
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<boolean, U> {
    return new XenomorphOr(this, other);
  }
}
