import {XenomorphBasetype} from './basetype';
import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';
import {isIPv4, isIPv6} from './string/ip';
import {isISBN10, isISBN13} from './string/isbn';
import {ChainFn} from './types';

export class XenomorphString extends XenomorphBasetype<string> {
  private chain: Array<ChainFn<string>> = [
    (value => this.isString(value)) as ChainFn<string>,
  ];

  private isString(value: unknown) {
    if (typeof value !== 'string')
      throw new TypeError(
        `${value} is of type ${typeof value} but expected it to be of type string.`
      );
    return value;
  }

  public matches(pattern: RegExp) {
    this.chain.push(value => {
      if (!pattern.test(value))
        throw new TypeError(`${value} does not match the given pattern.`);
      return value;
    });
    return this;
  }

  public min(n: number) {
    this.chain.push(value => {
      if (value.length < n)
        throw new TypeError('Minimum length was not reached.');
      return value;
    });
    return this;
  }

  public max(n: number) {
    this.chain.push(value => {
      if (value.length > n) throw new TypeError('Maximum length exceeded.');
      return value;
    });
    return this;
  }

  public blacklist(blacklist: Array<string>) {
    this.chain.push(value => {
      blacklist.forEach(word => {
        if (value.includes(word))
          throw new TypeError(
            `${value} contains ${word} which is blacklisted.`
          );
      });
      return value;
    });
    return this;
  }

  public isbn10() {
    this.chain.push(value => {
      return isISBN10(value);
    });
    return this;
  }

  public isbn13() {
    this.chain.push(value => {
      return isISBN13(value);
    });
    return this;
  }

  public ipv4() {
    this.chain.push(value => {
      return isIPv4(value);
    });
    return this;
  }

  public ipv6() {
    this.chain.push(value => {
      return isIPv6(value);
    });
    return this;
  }

  public parse(value: unknown) {
    this.chain.every(fn => {
      fn(value as string);
      return true;
    });
    return value as string;
  }

  public optional(): XenomorphOptional<string> {
    return new XenomorphOptional<string>(this);
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<string, U> {
    return new XenomorphOr(this, other);
  }
}
