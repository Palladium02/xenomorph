"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphOptional = void 0;
const basetype_1 = require("./basetype");
const or_1 = require("./or");
class XenomorphOptional extends basetype_1.XenomorphBasetype {
    constructor(constraints) {
        super();
        this.nonOptionalConstraints = constraints;
    }
    parse(value) {
        if (value === undefined)
            return value;
        this.nonOptionalConstraints.parse(value);
        return value;
    }
    or(other) {
        return new or_1.XenomorphOr(this, other);
    }
    optional() {
        return new XenomorphOptional(this);
    }
}
exports.XenomorphOptional = XenomorphOptional;
//# sourceMappingURL=optional.js.map