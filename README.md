# typd

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![travis-ci](https://travis-ci.org/phuu/typd.svg?branch=master)](https://travis-ci.org/phuu/typd)

Runtime type-checking for JavaScript. Mostly a wrapper around [typecheck][typecheck].

## Table of contents

* [Install](#install)
* [Use](#use)
* [Examples](#examples)
* [Contributing](#contributing)
* [Thanks](#thanks)
* [License](#license)

## Install

```
npm install --save typd
```

## Use

`typd` wraps functions to add runtime type-checks to them. The resulting function will throw if the arguments don't match.

```js
import Typd from 'typd';

const add =
  Typd(
    ['a', Typd.number],
    ['b', Typd.number],
    (a, b) => a + b
  );
```

The `Typd` function takes any number of `[string, function]` tuples that represent argument name and the *checker*, and finally the function to be wrapped.

There are a few available checkers. Some match the `flow` type documentation:

- [`Typd.any`](http://flowtype.org/docs/quick-reference.html#the-any-primitive-type)
- [`Typd.none`](http://flowtype.org/docs/quick-reference.html#the-none-primitive-type)
- [`Typd.boolean`](http://flowtype.org/docs/quick-reference.html#the-boolean-primitive-type)
- [`Typd.Boolean`](http://flowtype.org/docs/quick-reference.html#the-boolean-constructor)
- [`Typd.string`](http://flowtype.org/docs/quick-reference.html#the-string-primitive-type)
- [`Typd.String`](http://flowtype.org/docs/quick-reference.html#the-string-constructor)
- [`Typd.number`](http://flowtype.org/docs/quick-reference.html#the-number-primitive-type)
- [`Typd.Number`](http://flowtype.org/docs/quick-reference.html#the-number-constructor)
- [`Typd.Object`](http://flowtype.org/docs/quick-reference.html#the-object-constructor)

There are a few others available:

- `Typd.function` matches any function
- `Typd.arrayOf` takes another checker, and matches arrays that contain elements that pass the supplied checker type. For example, `Typd.arrayOf(Typd.boolean)`
- `Typd.maybe` takes another checker, matching that type *or* undefined. For example, `Typd.maybe(Typd.boolean)`.
- `Typd.oneOf` takes many checkers and makes sure one of them matches. For example, `Typd.oneOf(Typd.string, Typd.String)`.

## Examples

```js
const { maybe, arrayOf, oneOf, string, number } = Typd;

// Match an array of strings
var f = Typd(
  ['...args', arrayOf(string)],
  (...args) => {/* ... */}
);

// Match two numbers and an optional options object
var f = Typd(
  ['a',    number],
  ['b',    number],
  ['opts', maybe(Object)],
  (a, b, opts={}) => {/* ... */}
);

// Match an optional array of either strings or numbers.
var f = Typd(
  ['...args', maybe(arrayOf(oneOf(string, number)))],
  (...args) => {/* ... */}
);


// Match a string and an optional callback function
var f = Typd(
  ['path', string],
  ['cb', maybe(Typd.function)],
  (path, cb) => {/* ... */}
);
```


## Contributing

Please read the [contribution guidelines][contributing-url]. Contributions are
welcome!

## Thanks

Thanks to those who work on [typecheck][typecheck], without whom this would have been a *lot* more work.

## License

Copyright (c) 2015 Tom Ashworth. Released under the [MIT
license](http://www.opensource.org/licenses/mit-license.php).

[contributing-url]: https://github.com/phuu/typd/blob/master/CONTRIBUTING.md
[typecheck]: https://github.com/codemix/babel-plugin-typecheck
