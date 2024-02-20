"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphPartial = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
const or_1 = require("./or");
class XenomorphPartial extends basetype_1.XenomorphBasetype {
    constructor(schema, shouldStrip = false) {
        super();
        this.chain = [
            (value => this.matchesSchema(value)),
        ];
        this.schema = schema;
        this.shouldStrip = shouldStrip;
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
            if (value[key] === undefined)
                continue;
            type.parse(value[key]);
        }
        return value;
    }
    strip() {
        this.shouldStrip = true;
    }
    // public merge<ToMergeWith extends Record<string, XenomorphBasetype<unknown>>>(
    //   schema: XenomorphObject<ToMergeWith> | XenomorphPartial<ToMergeWith>
    // ) {
    //   return new XenomorphObject({
    //     ...this.schema,
    //     ...schema.shape(),
    //   });
    // }
    shape() {
        return this.schema;
    }
    parse(value) {
        this.chain.every(fn => fn(value));
        return value;
    }
    or(other) {
        return new or_1.XenomorphOr(this, other);
    }
    optional() {
        return new optional_1.XenomorphOptional(this);
    }
}
exports.XenomorphPartial = XenomorphPartial;
//# sourceMappingURL=partial.js.map