import { XenomorphBasetype } from './basetype';
import { XenomorphOptional } from './optional';
import { XenomorphOr } from './or';
export declare class XenomorphDate extends XenomorphBasetype<Date> {
    private chain;
    private isDate;
    before(date: Date): this;
    after(date: Date): this;
    wasLeapYear(): this;
    parse(value: unknown): Date;
    or<U>(other: XenomorphBasetype<U>): XenomorphOr<Date, U>;
    optional(): XenomorphOptional<Date>;
}
