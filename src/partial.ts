import {XenomorphBasetype} from './basetype';
import {XenomorphObject} from './object';
import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';
import {ChainFn} from './types';

export class XenomorphPartial<
  Schema extends Record<string, XenomorphBasetype<unknown>>,
  Output extends Partial<{
    [Key in keyof Schema]: XenomorphOptional<ReturnType<Schema[Key]['parse']>>;
  }> = Partial<{
    [Key in keyof Schema]: XenomorphOptional<ReturnType<Schema[Key]['parse']>>;
  }>,
> extends XenomorphBasetype<Output> {
  private chain: Array<ChainFn<Output>> = [
    (value => this.matchesSchema(value)) as ChainFn<Output>,
  ];
  private schema: Schema;
  private shouldStrip: boolean;

  public constructor(schema: Schema, shouldStrip = false) {
    super();
    this.schema = schema;
    this.shouldStrip = shouldStrip;
  }

  private matchesSchema(value: unknown) {
    if (typeof value !== 'object')
      throw new TypeError(
        `${value} is of type ${typeof value} but expected it to be of type object.`
      );
    if (Array.isArray(value))
      throw new TypeError(
        `${value} is of type Array but expected it to be of type object.`
      );
    if (!value) throw new TypeError('Expected the given value to be defined.');

    if (this.shouldStrip) {
      Object.keys(value).forEach(key => {
        if (this.schema[key as keyof Schema] === undefined)
          delete value[key as keyof typeof value];
      });

      if (Object.keys(this.schema).length !== Object.keys(value).length)
        throw new TypeError('The keys from value and schema are mismatching.');
    }

    for (const [key, type] of Object.entries(this.schema)) {
      if (value[key as keyof typeof value] === undefined) continue;
      type.parse(value[key as keyof typeof value]);
    }

    return value;
  }

  public strip() {
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

  public shape() {
    return this.schema;
  }

  public parse(value: unknown) {
    this.chain.every(fn => fn(value as Output));
    return value as Output;
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<Output, U> {
    return new XenomorphOr(this, other);
  }

  public optional(): XenomorphOptional<Output> {
    return new XenomorphOptional(this);
  }
}
