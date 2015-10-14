# typ

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![travis-ci](https://travis-ci.org/phuu/typ.svg?branch=master)](https://travis-ci.org/phuu/typ)

Runtime type-checking for JavaScript. Actually a wrapper around [typecheck][typecheck].

## Table of contents

* [Install](#install)
* [Use](#use)
* [Contributing](#contributing)
* [Thanks](#thanks)
* [License](#license)

## Install

```
npm install --save typ
```

## Use

`typ` wraps functions to add runtime type-checks to them. The resulting function with throw if the arguments don't match.

```js
import Typ from 'typ';

const add =
  Typ.ed(
    ['a', Typ.number],
    ['b', Typ.number],
    (a, b) => a + b
  );
```

The `Typ.ed` function takes any number of `[string, function]` tuples that represent argument name and the *checker*.

There are a few available checkers. Some match the `flow` type documentation:

- [`Typ.any`](http://flowtype.org/docs/quick-reference.html#the-any-primitive-type)
- [`Typ.mixed`](http://flowtype.org/docs/quick-reference.html#the-mixed-primitive-type)
- [`Typ.none`](http://flowtype.org/docs/quick-reference.html#the-none-primitive-type)
- [`Typ.boolean`](http://flowtype.org/docs/quick-reference.html#the-boolean-primitive-type)
- [`Typ.Boolean`](http://flowtype.org/docs/quick-reference.html#the-boolean-constructor)
- [`Typ.string`](http://flowtype.org/docs/quick-reference.html#the-string-primitive-type)
- [`Typ.String`](http://flowtype.org/docs/quick-reference.html#the-string-constructor)
- [`Typ.number`](http://flowtype.org/docs/quick-reference.html#the-number-primitive-type)
- [`Typ.Number`](http://flowtype.org/docs/quick-reference.html#the-number-constructor)
- [`Typ.Object`](http://flowtype.org/docs/quick-reference.html#the-object-constructor)

There are a few others available:

- `Typ.ArrayOf` is a function that takes another *checker*, matching an array of that type. For example, `Typ.ArrayOf(Typ.boolean)`
- `Typ.optionalOf` is a function that takes another checker, matching that type *or* undefined. For example, `Typ.optionalOf(Type.boolean)`.
- `Typ.customOf` is a function that takes any function, so you can build custom checkers. For example, `Type.customOf(x => Array.isArray(x) && x.length === 2)`.

## Contributing

Please read the [contribution guidelines][contributing-url]. Contributions are
welcome!

## Thanks

Thanks to those who work on [typecheck][typecheck], without whom this would have been a *lot* more work.

## License

Copyright (c) 2015 Tom Ashworth. Released under the [MIT
license](http://www.opensource.org/licenses/mit-license.php).

[contributing-url]: https://github.com/phuu/typ/blob/master/CONTRIBUTING.md
[typecheck]: https://github.com/codemix/babel-plugin-typecheck
