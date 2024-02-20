import {XenomorphBasetype} from './basetype';
import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';
import {ChainFn} from './types';

export class XenomorphDate extends XenomorphBasetype<Date> {
  private chain: Array<ChainFn<Date>> = [
    (value => this.isDate(value)) as ChainFn<Date>,
  ];

  private isDate(value: unknown) {
    if (typeof value === 'string') {
      // try safe parse
      try {
        return new Date(value);
      } catch (_) {
        throw new TypeError(`${value} cannot be parsed into a Date.`);
      }
    } else if (value instanceof Date) {
      return value;
    }
    throw new TypeError(
      `${value} is of type ${typeof value} but expected it to be of type Date.`
    );
  }

  public before(date: Date) {
    this.chain.push(value => {
      if (value.getTime() >= date.getTime())
        throw new TypeError(`Expected ${value} to be before ${date}.`);
      return value;
    });
    return this;
  }

  public after(date: Date) {
    this.chain.push(value => {
      if (value.getTime() <= date.getTime())
        throw new TypeError(`Expected ${value} to be after ${date}.`);
      return value;
    });
    return this;
  }

  public leapyear() {
    this.chain.push(value => {
      const year = value.getFullYear();
      if (year % 4 !== 0)
        throw new TypeError(`${year} is/was not a leap year.`);
      if (year % 100 === 0 && year % 400) return value;
      throw new TypeError(`${year} is/was not a leap year.`);
    });
    return this;
  }

  public parse(value: unknown): Date {
    return this.chain.reduce((acc, fn) => {
      return fn(acc as Date);
    }, value) as Date;
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<Date, U> {
    return new XenomorphOr(this, other);
  }

  public optional(): XenomorphOptional<Date> {
    return new XenomorphOptional<Date>(this);
  }
}
