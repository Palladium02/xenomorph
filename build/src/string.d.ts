import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
export declare class XenomorphString extends XenomorphBasetype<string> {
    private chain;
    private isString;
    matches(pattern: RegExp): this;
    min(n: number): this;
    max(n: number): this;
    blacklist(blacklist: Array<string>): this;
    isbn10(): this;
    isbn13(): this;
    ipv4(): this;
    ipv6(): this;
    parse(value: unknown): string;
    optional(): XenomorphOptional<string>;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<string, U>;
}
