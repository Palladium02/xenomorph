"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isISBN13 = exports.isISBN10 = void 0;
function isISBN10(value) {
    if (value.length !== 10)
        throw new TypeError(`${value} does not have the required length for an isbn10.`);
    const baseIndex = 10;
    const checksum = value.split('').reduce((accumulator, char, index) => {
        accumulator += Number(char) * (baseIndex - index);
        return accumulator;
    }, 0);
    if (checksum % 11 !== 0)
        throw new TypeError();
    return value;
}
exports.isISBN10 = isISBN10;
function isISBN13(value) {
    if (value.length !== 13)
        throw new TypeError(`${value} does not have the required length for an isbn13.`);
    const checksum = value.split('').reduce((acc, char, idx) => {
        acc += Number(char) * (idx % 2 ? 3 : 1);
        return acc;
    }, 0);
    if (checksum % 10 !== 0)
        throw new TypeError(`The checksum of ${value} is wrong.`);
    return value;
}
exports.isISBN13 = isISBN13;
//# sourceMappingURL=isbn.js.map