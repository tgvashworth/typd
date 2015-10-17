import expect from 'unexpected';
import { inspect } from 'util';
import Typd from '.';

class Biscuit {}
class Cake {}

describe('Typd', () => {
  it('calls the inner function', () => {
    Typd(arg => {
      expect(arg, 'to be true');
    })(true);
  });

  it('throws when a check fails', () => {
    const Thrower = () => {
      throw new Error('No way mate');
    };

    expect(() => {
      Typd(['theTruth', Thrower], theTruth => {})(true);
    }, 'to throw')
  });

  it('can check multiple values', () => {
    expect(() => {
      Typd(
        ['theTruth', Typd.boolean],
        ['theString', Typd.string],
        (theTruth, theString) => {}
      )(true, 'yes');
    }, 'not to throw');

    expect(() => {
      Typd(
        ['theTruth', Typd.boolean],
        ['theHorror', Typd.String],
        (theLies, theHorror) => {}
      )(true, undefined);
    }, 'to throw');
  });
});

describe('in use', () => {
  it('is good', () => {
    const add =
      Typd(
        ['a', Typd.number],
        ['b', Typd.number],
        (a, b) => a + b
      );

    expect(() => add(1, 2), 'not to throw');
    expect(() => add(1, 'hello!'), 'to throw');
  });
});

describe('expect type checker', () => {
  [
    // any
    [Typd.any, undefined,             'not to throw'],
    [Typd.any, true,                  'not to throw'],
    [Typd.any, false,                 'not to throw'],
    [Typd.any, new Boolean(true),     'not to throw'],
    [Typd.any, new Boolean(false),    'not to throw'],
    [Typd.any, 'hello',               'not to throw'],
    [Typd.any, '',                    'not to throw'],
    [Typd.any, new String('hello'),   'not to throw'],
    [Typd.any, new String(''),        'not to throw'],
    [Typd.any, 0,                     'not to throw'],
    [Typd.any, 1,                     'not to throw'],
    [Typd.any, NaN,                   'not to throw'],
    [Typd.any, new Number(0),         'not to throw'],
    [Typd.any, new Number(1),         'not to throw'],
    [Typd.any, new Number(NaN),       'not to throw'],
    [Typd.any, {},                    'not to throw'],
    [Typd.any, new Object(),          'not to throw'],
    [Typd.any, function () {},        'not to throw'],

    // none
    [Typd.none, undefined,           'not to throw'],
    [Typd.none, true,                'to throw'],
    [Typd.none, false,               'to throw'],
    [Typd.none, new Boolean(true),   'to throw'],
    [Typd.none, new Boolean(false),  'to throw'],
    [Typd.none, 'hello',             'to throw'],
    [Typd.none, '',                  'to throw'],
    [Typd.none, new String('hello'), 'to throw'],
    [Typd.none, new String(''),      'to throw'],
    [Typd.none, 0,                   'to throw'],
    [Typd.none, 1,                   'to throw'],
    [Typd.none, NaN,                 'to throw'],
    [Typd.none, new Number(0),       'to throw'],
    [Typd.none, new Number(1),       'to throw'],
    [Typd.none, new Number(NaN),     'to throw'],
    [Typd.none, {},                  'to throw'],
    [Typd.none, new Object(),        'to throw'],
    [Typd.none, function () {},      'to throw'],

    // boolean
    [Typd.boolean, undefined,           'to throw'],
    [Typd.boolean, true,                'not to throw'],
    [Typd.boolean, false,               'not to throw'],
    [Typd.boolean, new Boolean(true),   'to throw'],
    [Typd.boolean, new Boolean(false),  'to throw'],
    [Typd.boolean, 'hello',             'to throw'],
    [Typd.boolean, '',                  'to throw'],
    [Typd.boolean, new String('hello'), 'to throw'],
    [Typd.boolean, new String(''),      'to throw'],
    [Typd.boolean, 0,                   'to throw'],
    [Typd.boolean, 1,                   'to throw'],
    [Typd.boolean, NaN,                 'to throw'],
    [Typd.boolean, new Number(0),       'to throw'],
    [Typd.boolean, new Number(1),       'to throw'],
    [Typd.boolean, new Number(NaN),     'to throw'],
    [Typd.boolean, {},                  'to throw'],
    [Typd.boolean, new Object(),        'to throw'],
    [Typd.boolean, function () {},      'to throw'],

    // Boolean
    [Typd.Boolean, undefined,           'to throw'],
    [Typd.Boolean, true,                'to throw'],
    [Typd.Boolean, false,               'to throw'],
    [Typd.Boolean, new Boolean(true),   'not to throw'],
    [Typd.Boolean, new Boolean(false),  'not to throw'],
    [Typd.Boolean, 'hello',             'to throw'],
    [Typd.Boolean, '',                  'to throw'],
    [Typd.Boolean, new String('hello'), 'to throw'],
    [Typd.Boolean, new String(''),      'to throw'],
    [Typd.Boolean, 0,                   'to throw'],
    [Typd.Boolean, 1,                   'to throw'],
    [Typd.Boolean, NaN,                 'to throw'],
    [Typd.Boolean, new Number(0),       'to throw'],
    [Typd.Boolean, new Number(1),       'to throw'],
    [Typd.Boolean, new Number(NaN),     'to throw'],
    [Typd.Boolean, {},                  'to throw'],
    [Typd.Boolean, new Object(),        'to throw'],
    [Typd.Boolean, function () {},      'to throw'],

    // string
    [Typd.string, undefined,           'to throw'],
    [Typd.string, true,                'to throw'],
    [Typd.string, false,               'to throw'],
    [Typd.string, new Boolean(true),   'to throw'],
    [Typd.string, new Boolean(false),  'to throw'],
    [Typd.string, 'hello',             'not to throw'],
    [Typd.string, '',                  'not to throw'],
    [Typd.string, new String('hello'), 'to throw'],
    [Typd.string, new String(''),      'to throw'],
    [Typd.string, 0,                   'to throw'],
    [Typd.string, 1,                   'to throw'],
    [Typd.string, NaN,                 'to throw'],
    [Typd.string, new Number(0),       'to throw'],
    [Typd.string, new Number(1),       'to throw'],
    [Typd.string, new Number(NaN),     'to throw'],
    [Typd.string, {},                  'to throw'],
    [Typd.string, new Object(),        'to throw'],
    [Typd.string, function () {},      'to throw'],

    // String
    [Typd.String, undefined,           'to throw'],
    [Typd.String, true,                'to throw'],
    [Typd.String, false,               'to throw'],
    [Typd.String, new Boolean(true),   'to throw'],
    [Typd.String, new Boolean(false),  'to throw'],
    [Typd.String, 'hello',             'to throw'],
    [Typd.String, '',                  'to throw'],
    [Typd.String, new String('hello'), 'not to throw'],
    [Typd.String, new String(''),      'not to throw'],
    [Typd.String, 0,                   'to throw'],
    [Typd.String, 1,                   'to throw'],
    [Typd.String, NaN,                 'to throw'],
    [Typd.String, new Number(0),       'to throw'],
    [Typd.String, new Number(1),       'to throw'],
    [Typd.String, new Number(NaN),     'to throw'],
    [Typd.String, {},                  'to throw'],
    [Typd.String, new Object(),        'to throw'],
    [Typd.String, function () {},      'to throw'],

    // number
    [Typd.number, undefined,           'to throw'],
    [Typd.number, true,                'to throw'],
    [Typd.number, false,               'to throw'],
    [Typd.number, new Boolean(true),   'to throw'],
    [Typd.number, new Boolean(false),  'to throw'],
    [Typd.number, 'hello',             'to throw'],
    [Typd.number, '',                  'to throw'],
    [Typd.number, new String('hello'), 'to throw'],
    [Typd.number, new String(''),      'to throw'],
    [Typd.number, 0,                   'not to throw'],
    [Typd.number, 1,                   'not to throw'],
    [Typd.number, NaN,                 'not to throw'],
    [Typd.number, new Number(0),       'to throw'],
    [Typd.number, new Number(1),       'to throw'],
    [Typd.number, new Number(NaN),     'to throw'],
    [Typd.number, {},                  'to throw'],
    [Typd.number, new Object(),        'to throw'],
    [Typd.number, function () {},      'to throw'],

    // Number
    [Typd.Number, undefined,           'to throw'],
    [Typd.Number, true,                'to throw'],
    [Typd.Number, false,               'to throw'],
    [Typd.Number, new Boolean(true),   'to throw'],
    [Typd.Number, new Boolean(false),  'to throw'],
    [Typd.Number, 'hello',             'to throw'],
    [Typd.Number, '',                  'to throw'],
    [Typd.Number, new String('hello'), 'to throw'],
    [Typd.Number, new String(''),      'to throw'],
    [Typd.Number, 0,                   'to throw'],
    [Typd.Number, 1,                   'to throw'],
    [Typd.Number, NaN,                 'to throw'],
    [Typd.Number, new Number(0),       'not to throw'],
    [Typd.Number, new Number(1),       'not to throw'],
    [Typd.Number, new Number(NaN),     'not to throw'],
    [Typd.Number, {},                  'to throw'],
    [Typd.Number, new Object(),        'to throw'],
    [Typd.Number, function () {},      'to throw'],

    // Object
    [Typd.Object, undefined,           'to throw'],
    [Typd.Object, true,                'to throw'],
    [Typd.Object, false,               'to throw'],
    [Typd.Object, new Boolean(true),   'not to throw'],
    [Typd.Object, new Boolean(false),  'not to throw'],
    [Typd.Object, 'hello',             'to throw'],
    [Typd.Object, '',                  'to throw'],
    [Typd.Object, new String('hello'), 'not to throw'],
    [Typd.Object, new String(''),      'not to throw'],
    [Typd.Object, 0,                   'to throw'],
    [Typd.Object, 1,                   'to throw'],
    [Typd.Object, NaN,                 'to throw'],
    [Typd.Object, new Number(0),       'not to throw'],
    [Typd.Object, new Number(1),       'not to throw'],
    [Typd.Object, new Number(NaN),     'not to throw'],
    [Typd.Object, {},                  'not to throw'],
    [Typd.Object, new Object(),        'not to throw'],
    [Typd.Object, function () {},      'to throw'],

    // function
    [Typd.function, undefined,           'to throw'],
    [Typd.function, true,                'to throw'],
    [Typd.function, false,               'to throw'],
    [Typd.function, new Boolean(true),   'to throw'],
    [Typd.function, new Boolean(false),  'to throw'],
    [Typd.function, 'hello',             'to throw'],
    [Typd.function, '',                  'to throw'],
    [Typd.function, new String('hello'), 'to throw'],
    [Typd.function, new String(''),      'to throw'],
    [Typd.function, 0,                   'to throw'],
    [Typd.function, 1,                   'to throw'],
    [Typd.function, NaN,                 'to throw'],
    [Typd.function, new Number(0),       'to throw'],
    [Typd.function, new Number(1),       'to throw'],
    [Typd.function, new Number(NaN),     'to throw'],
    [Typd.function, {},                  'to throw'],
    [Typd.function, new Object(),        'to throw'],
    [Typd.function, function () {},      'not to throw'],

    // ArrayOf
    [Typd.ArrayOf(Typd.boolean), [true],   'not to throw'],
    [Typd.ArrayOf(Typd.boolean), ['fish'], 'to throw'],

    // arrayOf
    [Typd.arrayOf(Typd.boolean), [true],   'not to throw'],
    [Typd.arrayOf(Typd.boolean), ['fish'], 'to throw'],

    // optionalOf
    [Typd.optionalOf(Typd.boolean), true,      'not to throw'],
    [Typd.optionalOf(Typd.boolean), undefined, 'not to throw'],
    [Typd.optionalOf(Typd.boolean), 1,         'to throw'],

    // maybe
    [Typd.maybe(Typd.boolean), true,      'not to throw'],
    [Typd.maybe(Typd.boolean), undefined, 'not to throw'],
    [Typd.maybe(Typd.boolean), 1,         'to throw'],

    // oneOf
    [Typd.oneOf(Typd.boolean, Typd.string), 'custom', 'not to throw'],
    [Typd.oneOf(Typd.boolean, Typd.string), true,     'not to throw'],
    [Typd.oneOf(Typd.boolean, Typd.string), {},       'to throw']
  ].forEach(([f, v, assertion, ...rest]) => {
    it(`${assertion} for ${f.name} with ${inspect(v, { depth: 3, colors: false })}`, () => {
      expect(() => f(v), assertion, ...rest);
    });
  });
});
