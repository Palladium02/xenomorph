"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphObject = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
const or_1 = require("./or");
const partial_1 = require("./partial");
class XenomorphObject extends basetype_1.XenomorphBasetype {
    constructor(schema) {
        super();
        this.chain = [
            (value => this.matchesSchema(value)),
        ];
        this.shouldStrip = false;
        this.schema = schema;
    }
    matchesSchema(value) {
        if (typeof value !== 'object')
            throw new TypeError(`${value} is of type ${typeof value} but expected it to be of type object.`);
        if (Array.isArray(value))
            throw new TypeError(`${value} is of type Array but expected it to be of type object.`);
        if (!value)
            throw new TypeError('Expected the given value to be defined.');
        if (this.shouldStrip) {
            Object.keys(value).forEach(key => {
                if (this.schema[key] === undefined)
                    delete value[key];
            });
            if (Object.keys(this.schema).length !== Object.keys(value).length)
                throw new TypeError('The keys from value and schema are mismatching.');
        }
        for (const [key, type] of Object.entries(this.schema)) {
            type.parse(value[key]);
        }
        return value;
    }
    strip() {
        this.shouldStrip = true;
        return this;
    }
    partial() {
        return new partial_1.XenomorphPartial(this.schema, this.shouldStrip);
    }
    merge(schema) {
        return new XenomorphObject({
            ...schema.shape(),
            ...this.schema,
        });
    }
    shape() {
        return this.schema;
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
exports.XenomorphObject = XenomorphObject;
//# sourceMappingURL=object.js.map