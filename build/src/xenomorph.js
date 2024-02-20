"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xenomorph = void 0;
const any_1 = require("./any");
const array_1 = require("./array");
const boolean_1 = require("./boolean");
const date_1 = require("./date");
const literal_1 = require("./literal");
const null_1 = require("./null");
const number_1 = require("./number");
const object_1 = require("./object");
const string_1 = require("./string");
const xenomorph = () => ({
    number: () => new number_1.XenomorphNumber(),
    string: () => new string_1.XenomorphString(),
    date: () => new date_1.XenomorphDate(),
    object: (schema) => new object_1.XenomorphObject(schema),
    array: (type) => new array_1.XenomorphArray(type),
    any: () => new any_1.XenomorphAny(),
    boolean: () => new boolean_1.XenomorphBoolean(),
    literal: (literal) => new literal_1.XenomorphLiteral(literal),
    null: () => new null_1.XenomorphNull(),
});
exports.xenomorph = xenomorph;
//# sourceMappingURL=xenomorph.js.map