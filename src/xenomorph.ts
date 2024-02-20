import {XenomorphAny} from './any';
import {XenomorphArray} from './array';
import {XenomorphBasetype} from './basetype';
import {XenomorphBoolean} from './boolean';
import {XenomorphDate} from './date';
import {XenomorphLiteral} from './literal';
import {XenomorphNull} from './null';
import {XenomorphNumber} from './number';
import {XenomorphObject} from './object';
import {XenomorphString} from './string';

export const xenomorph = () => ({
  number: () => new XenomorphNumber(),
  string: () => new XenomorphString(),
  date: () => new XenomorphDate(),
  object: <Schema extends Record<string, XenomorphBasetype<unknown>>>(
    schema: Schema
  ) => new XenomorphObject<Schema>(schema),
  array: <T>(type: XenomorphBasetype<T>) => new XenomorphArray(type),
  any: () => new XenomorphAny(),
  boolean: () => new XenomorphBoolean(),
  literal: <T>(literal: T) => new XenomorphLiteral(literal),
  null: () => new XenomorphNull(),
});

export const x = xenomorph();
