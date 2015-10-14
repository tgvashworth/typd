# typd

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![travis-ci](https://travis-ci.org/phuu/typd.svg?branch=master)](https://travis-ci.org/phuu/typd)

Runtime type-checking for JavaScript. Actually a wrapper around [typecheck][typecheck].

## Table of contents

* [Install](#install)
* [Use](#use)
* [Contributing](#contributing)
* [Thanks](#thanks)
* [License](#license)

## Install

```
npm install --save typd
```

## Use

`typd` wraps functions to add runtime type-checks to them. The resulting function with throw if the arguments don't match.

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
- [`Typd.mixed`](http://flowtype.org/docs/quick-reference.html#the-mixed-primitive-type)
- [`Typd.none`](http://flowtype.org/docs/quick-reference.html#the-none-primitive-type)
- [`Typd.boolean`](http://flowtype.org/docs/quick-reference.html#the-boolean-primitive-type)
- [`Typd.Boolean`](http://flowtype.org/docs/quick-reference.html#the-boolean-constructor)
- [`Typd.string`](http://flowtype.org/docs/quick-reference.html#the-string-primitive-type)
- [`Typd.String`](http://flowtype.org/docs/quick-reference.html#the-string-constructor)
- [`Typd.number`](http://flowtype.org/docs/quick-reference.html#the-number-primitive-type)
- [`Typd.Number`](http://flowtype.org/docs/quick-reference.html#the-number-constructor)
- [`Typd.Object`](http://flowtype.org/docs/quick-reference.html#the-object-constructor)

There are a few others available:

- `Typd.ArrayOf` is a function that takes another *checker*, matching an array of that type. For example, `Typd.ArrayOf(Typd.boolean)`
- `Typd.optionalOf` is a function that takes another checker, matching that type *or* undefined. For example, `Typd.optionalOf(Type.boolean)`.
- `Typd.customOf` is a function that takes any function, so you can build custom checkers. For example, `Typd.customOf(x => Array.isArray(x) && x.length === 2)`.

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
