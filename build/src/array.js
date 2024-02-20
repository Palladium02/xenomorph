"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphArray = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
const or_1 = require("./or");
class XenomorphArray extends basetype_1.XenomorphBasetype {
    constructor(type) {
        super();
        this.chain = [value => this.isOfType(value)];
        this.type = type;
    }
    isOfType(value) {
        if (!Array.isArray(value))
            throw new TypeError();
        return value.map(v => this.type.parse(v));
    }
    min(n) {
        this.chain.push(value => {
            if (value.length < n)
                throw new TypeError(`The given array is too short expected a minimum length of ${n} got ${value.length}.`);
            return value;
        });
        return this;
    }
    max(n) {
        this.chain.push(value => {
            if (value.length > n)
                throw new TypeError(`The given array is too long expected a maximum length of ${n} got ${value.length}`);
            return value;
        });
        return this;
    }
    parse(value) {
        return this.chain.map(fn => fn(value));
    }
    or(other) {
        return new or_1.XenomorphOr(this, other);
    }
    optional() {
        return new optional_1.XenomorphOptional(this);
    }
}
exports.XenomorphArray = XenomorphArray;
//# sourceMappingURL=array.js.map