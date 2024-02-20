"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenomorphString = void 0;
const basetype_1 = require("./basetype");
const optional_1 = require("./optional");
const or_1 = require("./or");
const ip_1 = require("./string/ip");
const isbn_1 = require("./string/isbn");
class XenomorphString extends basetype_1.XenomorphBasetype {
    constructor() {
        super(...arguments);
        this.chain = [
            (value => this.isString(value)),
        ];
    }
    isString(value) {
        if (typeof value !== 'string')
            throw new TypeError(`${value} is of type ${typeof value} but expected it to be of type string.`);
        return value;
    }
    matches(pattern) {
        this.chain.push(value => {
            if (!pattern.test(value))
                throw new TypeError(`${value} does not match the given pattern.`);
            return value;
        });
        return this;
    }
    min(n) {
        this.chain.push(value => {
            if (value.length < n)
                throw new TypeError('Minimum length was not reached.');
            return value;
        });
        return this;
    }
    max(n) {
        this.chain.push(value => {
            if (value.length > n)
                throw new TypeError('Maximum length exceeded.');
            return value;
        });
        return this;
    }
    blacklist(blacklist) {
        this.chain.push(value => {
            blacklist.forEach(word => {
                if (value.includes(word))
                    throw new TypeError(`${value} contains ${word} which is blacklisted.`);
            });
            return value;
        });
        return this;
    }
    isbn10() {
        this.chain.push(value => {
            return (0, isbn_1.isISBN10)(value);
        });
        return this;
    }
    isbn13() {
        this.chain.push(value => {
            return (0, isbn_1.isISBN13)(value);
        });
        return this;
    }
    ipv4() {
        this.chain.push(value => {
            return (0, ip_1.isIPv4)(value);
        });
        return this;
    }
    ipv6() {
        this.chain.push(value => {
            return (0, ip_1.isIPv6)(value);
        });
        return this;
    }
    parse(value) {
        this.chain.every(fn => {
            fn(value);
            return true;
        });
        return value;
    }
    optional() {
        return new optional_1.XenomorphOptional(this);
    }
    or(other) {
        return new or_1.XenomorphOr(this, other);
    }
}
exports.XenomorphString = XenomorphString;
//# sourceMappingURL=string.js.map