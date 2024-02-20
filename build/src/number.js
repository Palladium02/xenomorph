"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphNumber = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
const or_1 = require("./or");
class XenomorphNumber extends basetype_1.XenomorphBasetype {
    constructor() {
        super(...arguments);
        this.chain = [
            (value => this.isNumber(value)),
        ];
    }
    isNumber(value) {
        if (typeof value !== 'number')
            throw new TypeError(`${value} is of type ${typeof value} but expected it to be of type number.`);
        return value;
    }
    min(n) {
        this.chain.push(value => {
            if (value < n)
                throw new TypeError(`${value} is smaller than ${n}.`);
            return value;
        });
        return this;
    }
    max(n) {
        this.chain.push(value => {
            if (value > n)
                throw new TypeError(`${value} is bigger than ${n}.`);
            return value;
        });
        return this;
    }
    between(lower, upper) {
        this.chain.push(value => {
            if (value < lower || value > upper)
                throw new TypeError(`${value} is not in the given range [${lower}, ${upper}].`);
            return value;
        });
        return this;
    }
    gt(n) {
        this.chain.push(value => {
            if (value <= n)
                throw new TypeError(`${value} > ${n} does not hold.`);
            return value;
        });
        return this;
    }
    gte(n) {
        this.chain.push(value => {
            if (value < n)
                throw new TypeError(`${value} >= ${n} does not hold.`);
            return value;
        });
        return this;
    }
    lt(n) {
        this.chain.push(value => {
            if (value >= n)
                throw new TypeError(`${value} < ${n} does not hold.`);
            return value;
        });
        return this;
    }
    lte(n) {
        this.chain.push(value => {
            if (value > n)
                throw new TypeError(`${value} <= ${n} does not hold.`);
            return value;
        });
        return this;
    }
    int() {
        this.chain.push(value => {
            if (!Number.isInteger(value))
                throw new TypeError(`Expected ${value} to be an integer.`);
            return value;
        });
        return this;
    }
    float() {
        this.chain.push(value => {
            if (Number.isInteger(value))
                throw new TypeError(`Expected ${value} to be a float.`);
            return value;
        });
        return this;
    }
    even() {
        this.chain.push(value => {
            if (value % 2 !== 0)
                throw new TypeError(`${value} is odd.`);
            return value;
        });
        return this;
    }
    odd() {
        this.chain.push(value => {
            if (value % 2 === 0)
                throw new TypeError(`${value} is even.`);
            return value;
        });
        return this;
    }
    parse(value) {
        this.chain.every(fn => fn(value));
        return value;
    }
    optional() {
        return new optional_1.XenomorphOptional(this);
    }
    or(other) {
        return new or_1.XenomorphOr(this, other);
    }
}
exports.XenomorphNumber = XenomorphNumber;
//# sourceMappingURL=number.js.map