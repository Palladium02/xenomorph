"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphDate = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
const or_1 = require("./or");
class XenomorphDate extends basetype_1.XenomorphBasetype {
    constructor() {
        super(...arguments);
        this.chain = [
            (value => this.isDate(value)),
        ];
    }
    isDate(value) {
        if (typeof value === 'string') {
            // try safe parse
            try {
                return new Date(value);
            }
            catch (_) {
                throw new TypeError(`${value} cannot be parsed into a Date.`);
            }
        }
        else if (value instanceof Date) {
            return value;
        }
        throw new TypeError(`${value} is of type ${typeof value} but expected it to be of type Date.`);
    }
    before(date) {
        this.chain.push(value => {
            if (value.getTime() >= date.getTime())
                throw new TypeError(`Expected ${value} to be before ${date}.`);
            return value;
        });
        return this;
    }
    after(date) {
        this.chain.push(value => {
            if (value.getTime() <= date.getTime())
                throw new TypeError(`Expected ${value} to be after ${date}.`);
            return value;
        });
        return this;
    }
    wasLeapYear() {
        this.chain.push(value => {
            const year = value.getFullYear();
            if (year % 4 !== 0)
                throw new TypeError(`${year} is/was not a leap year.`);
            if (year % 100 === 0 && year % 400)
                return value;
            throw new TypeError(`${year} is/was not a leap year.`);
        });
        return this;
    }
    parse(value) {
        return this.chain.reduce((acc, fn) => {
            return fn(acc);
        }, value);
    }
    or(other) {
        return new or_1.XenomorphOr(this, other);
    }
    optional() {
        return new optional_1.XenomorphOptional(this);
    }
}
exports.XenomorphDate = XenomorphDate;
//# sourceMappingURL=date.js.map