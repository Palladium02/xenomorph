import {XenomorphBasetype} from './basetype';
import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';
import {ChainFn} from './types';

export class XenomorphNumber extends XenomorphBasetype<number> {
  private tryTransform = false;
  private chain: Array<ChainFn<number>> = [
    (value => this.isNumber(value)) as ChainFn<number>,
  ];

  private isNumber(value: unknown) {
    if (typeof value !== 'number')
      throw new TypeError(
        `${value} is of type ${typeof value} but expected it to be of type number.`
      );
    return value;
  }

  public min(n: number) {
    this.chain.push(value => {
      if (value < n) throw new TypeError(`${value} is smaller than ${n}.`);
      return value;
    });
    return this;
  }

  public max(n: number) {
    this.chain.push(value => {
      if (value > n) throw new TypeError(`${value} is bigger than ${n}.`);
      return value;
    });
    return this;
  }

  public between(lower: number, upper: number) {
    this.chain.push(value => {
      if (value < lower || value > upper)
        throw new TypeError(
          `${value} is not in the given range [${lower}, ${upper}].`
        );
      return value;
    });
    return this;
  }

  public gt(n: number) {
    this.chain.push(value => {
      if (value <= n) throw new TypeError(`${value} > ${n} does not hold.`);
      return value;
    });
    return this;
  }

  public gte(n: number) {
    this.chain.push(value => {
      if (value < n) throw new TypeError(`${value} >= ${n} does not hold.`);
      return value;
    });
    return this;
  }

  public lt(n: number) {
    this.chain.push(value => {
      if (value >= n) throw new TypeError(`${value} < ${n} does not hold.`);
      return value;
    });
    return this;
  }

  public lte(n: number) {
    this.chain.push(value => {
      if (value > n) throw new TypeError(`${value} <= ${n} does not hold.`);
      return value;
    });
    return this;
  }

  public int() {
    this.chain.push(value => {
      if (!Number.isInteger(value))
        throw new TypeError(`Expected ${value} to be an integer.`);
      return value;
    });
    return this;
  }

  public float() {
    this.chain.push(value => {
      if (Number.isInteger(value))
        throw new TypeError(`Expected ${value} to be a float.`);
      return value;
    });
    return this;
  }

  public even() {
    this.chain.push(value => {
      if (value % 2 !== 0) throw new TypeError(`${value} is odd.`);
      return value;
    });
    return this;
  }

  public odd() {
    this.chain.push(value => {
      if (value % 2 === 0) throw new TypeError(`${value} is even.`);
      return value;
    });
    return this;
  }

  public positive() {
    this.chain.push(value => {
      if (value <= 0) throw new TypeError(`${value} is not positive.`);
      return value;
    });
    return this;
  }

  public nonnegative() {
    this.chain.push(value => {
      if (value < 0) throw new TypeError(`${value} is negative.`);
      return value;
    });
    return this;
  }

  public negative() {
    this.chain.push(value => {
      if (value >= 0) throw new TypeError(`${value} is not negative.`);
      return value;
    });
    return this;
  }

  public nonpositive() {
    this.chain.push(value => {
      if (value > 0) throw new TypeError(`${value} is positive.`);
      return value;
    });
    return this;
  }

  public multipleOf(n: number) {
    this.chain.push(value => {
      if (value % n !== 0)
        throw new TypeError(`${value} is not a multiple of ${n}.`);
      return value;
    });
    return this;
  }

  public finite() {
    this.chain.push(value => {
      if (!Number.isFinite(value))
        throw new TypeError(`${value} is not a finite number.`);
      return value;
    });
    return this;
  }

  public safe() {
    this.chain.push(value => {
      if (!Number.isSafeInteger(value))
        throw new TypeError(`${value} is not a safe number.`);
      return value;
    });
    return this;
  }

  public transform() {
    this.tryTransform = true;
    return this;
  }

  public parse(value: unknown) {
    if (typeof value === 'string' && this.tryTransform)
      value = parseFloat(value);
    if (Number.isNaN(value)) throw new TypeError(`${value} is not a number.`);
    this.chain.every(fn => fn(value as number));
    return value as number;
  }

  public optional(): XenomorphOptional<number> {
    return new XenomorphOptional<number>(this);
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<number, U> {
    return new XenomorphOr(this, other);
  }
}
