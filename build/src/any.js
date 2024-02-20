"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphAny = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
const or_1 = require("./or");
class XenomorphAny extends basetype_1.XenomorphBasetype {
    parse(value) {
        return value;
    }
    or(other) {
        return new or_1.XenomorphOr(this, other);
    }
    optional() {
        return new optional_1.XenomorphOptional(this);
    }
}
exports.XenomorphAny = XenomorphAny;
//# sourceMappingURL=any.js.map