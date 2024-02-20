# Xenomorph

Xenomorph is a simple zero dependency schema validation library.

## Installation

```
npm install https://github.com/Palladium02/xenomorph.git
```

## Usage

To get started you simply import the `xenomorph` function or `x` as shorthand.

```ts
import {x, xenomorph} from 'xenomorph';
```

To create your first schema you can simply use one of the methods provided by Xenomorph.
Xenomorph also provideds the `Infer` utility type to create the type represented by your schema.

```ts
const User = x.object({
  email: x.string(),
  password: x.string().min(8),
});
type User = Infer<typeof User>;
//   ^? { email: string, password: string }
```

To then check whether a value matches the schema you can use the `parse` method. Note that `parse` will throw a type error if the value does not match the schema. `TypeError.message` will contain a string message describing the first error that occured.

```ts
try {
  User.parse({
    email: '',
    password: 123,
  }); // I will throw
} catch (error) {
  if (error instanceof TypeError) console.log(error.message);
}
```

Alternatively you can use `safeParse` which will return an object containing the success status and an optionally parsed value in case parsing does not fail.

```ts
const {success, value} = User.safeParse({
  email: '',
  password: 123,
});
```

## Nesting

You can nest schemas arbitrarely.

```ts
const Author = x.object({
  first: x.string().min(1),
  last: x.string().min(1),
  dob: x.date().optional(),
});
type Author = Infer<typeof Author>;

const Book = x.object({
  title: x.string().min(1),
  author: Author,
  pages: x.number().int().min(1).transform(),
});
type Book = Infer<typeof Book>;

const Library = x.object({
  name: x.string(),
  books: x.array(Book),
});
type Library = Infer<typeof Library>;
```

## Reference

Note that Xenomorph does not perform sanity checks on the schemas you have defined so be careful not to build contradictions.

### `x.string()`

`x.string()` creates a schema that expects/represents a string.

- `min(n: number)`
- `max(n: number)`
- `matches(pattern: RegExp)`
- `blacklist(blacklist: string[])`
- `isbn10()`
- `isbn13()`
- `ipv4()`
- `ipv6()`

### `x.number()`

`x.number()` creates a schema that expects/represents a number.

- `min(n: number)`
- `max(n: number)`
- `between(lower: number, upper: number)`
- `gt(n: number)`
- `gte(n: number)`
- `lt(n: number)`
- `lte(n: number)`
- `int()`
- `float()`
- `even()`
- `odd()`
- `posivite()`
- `nonnegative()`
- `negative()`
- `nonpositive()`
- `multipleOf(n: number)`
- `finite()`
- `safe()`
- `transform()`

### `x.boolean()`

`x.boolean()` creates a schema that expects/represents a boolean.

- `bottom()`
- `top()`

### `x.object(o)`

`x.object(o)` creates a schema that expects/represents an object where `o` defines the shape of said object.

- `nostrip()` - by default Xenomorph does strip unwanted properties from objects so use `nostrip()` to keep them
- `partial()`
- `shape()`

### `x.array(a)`

`x.array(a)` creates a schema that expects/represents an array where `a` is another schema which describes that shape of the items in said array.

- `min(n: number)`
- `max(n: number)`

### `x.date()`

`x.date()` creates a schema that expects/represents a date. If the given value is not a date but a string, Xenomorph will try to parse the string to create a date.

- `before()`
- `after()`
- `leapyear()`

### `x.literal(l)`

`x.literal(l)` creates a schema that expects/represents a literal value.

```ts
const Literal = x.literal('a');
type Literal = Infer<typeof Literal>;
//   ^? 'a'
```

### `x.null()`

`x.null()` creates a schema that expects/represents the null value.

```ts
const Null = x.null();
type Null = Infer<typeof Null>;
//   ^? null
```

### `x.any()`

`x.any()` creates a schema that expects/represents any value.

```ts
const Any = x.any();
type Any = Infer<typeof Any>;
//   ^? any
```

### `x.optional()` and `x.or()`

All Xenomorph types have an `optional` and a `or` method to create an optional schema or an union respectively.

```ts
const Char = x.string().min(1).max(1).or(x.number());
type Char = Infer<typeof Char>;
//   ^? string | number

const Maybe = x.boolean().optional();
type Maybe = Infer<typeof Maybe>;
//   ^? boolean | undefined
```

## Future plans

- allow for custom error messages
- more validation methods (input from the community is welcome)
- bug fixes (if any are found)
