"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphOr = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
class XenomorphOr extends basetype_1.XenomorphBasetype {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    parse(value) {
        try {
            return this.left.parse(value);
        }
        catch (_a) {
            return this.right.parse(value);
        }
    }
    or(other) {
        return new XenomorphOr(this, other);
    }
    optional() {
        return new optional_1.XenomorphOptional(this);
    }
}
exports.XenomorphOr = XenomorphOr;
//# sourceMappingURL=or.js.map