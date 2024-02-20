"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphLiteral = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
const or_1 = require("./or");
class XenomorphLiteral extends basetype_1.XenomorphBasetype {
    constructor(literal) {
        super();
        this.chain = [
            (value => this.isLiteral(value)),
        ];
        this.literal = literal;
    }
    isLiteral(value) {
        if (value !== this.literal)
            throw new TypeError(`${value} is not equal to ${this.literal}.`);
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
exports.XenomorphLiteral = XenomorphLiteral;
//# sourceMappingURL=literal.js.map