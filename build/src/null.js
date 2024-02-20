"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphNull = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
const or_1 = require("./or");
class XenomorphNull extends basetype_1.XenomorphBasetype {
    constructor() {
        super(...arguments);
        this.chain = [
            (value => this.isLiteral(value)),
        ];
    }
    isLiteral(value) {
        if (value !== null)
            throw new TypeError(`${value} is not null.`);
        return value;
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
exports.XenomorphNull = XenomorphNull;
//# sourceMappingURL=null.js.map