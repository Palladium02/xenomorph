"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphBoolean = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
const or_1 = require("./or");
class XenomorphBoolean extends basetype_1.XenomorphBasetype {
    constructor() {
        super(...arguments);
        this.chain = [
            (value => this.isBoolean(value)),
        ];
    }
    isBoolean(value) {
        if (typeof value !== 'boolean')
            throw new TypeError(`${value} is of type ${typeof value} but expected it to be of type boolean.`);
        return value;
    }
    bottom() {
        this.chain.push(value => {
            if (value)
                throw new TypeError(`${value} is not false.`);
            return value;
        });
        return this;
    }
    top() {
        this.chain.push(value => {
            if (!value)
                throw new TypeError(`${value} is not true.`);
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
exports.XenomorphBoolean = XenomorphBoolean;
//# sourceMappingURL=boolean.js.map