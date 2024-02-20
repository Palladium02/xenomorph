import {XenomorphBasetype} from './basetype';
import {XenomorphOptional} from './optional';

export class XenomorphOr<L, R> extends XenomorphBasetype<L | R> {
  private left: XenomorphBasetype<L>;
  private right: XenomorphBasetype<R>;
  public constructor(left: XenomorphBasetype<L>, right: XenomorphBasetype<R>) {
    super();
    this.left = left;
    this.right = right;
  }

  public parse(value: unknown): L | R {
    try {
      return this.left.parse(value);
    } catch {
      return this.right.parse(value);
    }
  }

  public or<U>(other: XenomorphBasetype<U>): XenomorphOr<L | R, U> {
    return new XenomorphOr<L | R, U>(this, other);
  }

  public optional(): XenomorphOptional<L | R | undefined> {
    return new XenomorphOptional(this);
  }
}
