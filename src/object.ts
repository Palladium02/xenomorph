import {XenomorphBasetype} from './basetype';
import {XenomorphOptional} from './optional';
import {XenomorphOr} from './or';
import {XenomorphPartial} from './partial';
import {ChainFn} from './types';

export class XenomorphObject<
  Schema extends Record<string, XenomorphBasetype<unknown>>,
  Output extends {
    [Key in keyof Schema]: ReturnType<Schema[Key]['parse']>;
  } = {
    [Key in keyof Schema]: ReturnType<Schema[Key]['parse']>;
  },
> extends XenomorphBasetype<Output> {
  private chain: Array<ChainFn<Output>> = [
    (value => this.matchesSchema(value)) as ChainFn<Output>,
  ];
  private schema: Schema;
  private shouldStrip = true;

  public constructor(schema: Schema) {
    super();
    this.schema = schema;
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
      type.parse(value[key as keyof typeof value]);
    }

    return value;
  }

  public nostrip() {
    this.shouldStrip = false;
    return this;
  }

  public partial() {
    return new XenomorphPartial(this.schema, this.shouldStrip);
  }

  public merge<ToMergeWith extends Record<string, XenomorphBasetype<unknown>>>(
    schema: XenomorphObject<ToMergeWith>
  ) {
    return new XenomorphObject({
      ...schema.shape(),
      ...this.schema,
    });
  }

  public shape() {
    return this.schema;
  }

  public parse(value: unknown) {
    this.chain.every(fn => fn(value as Output));
    return value as Output;
  }

  public optional(): XenomorphOptional<Output> {
    return new XenomorphOptional<Output>(this);
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<Output, U> {
    return new XenomorphOr(this, other);
  }
}
