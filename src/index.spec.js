import expect from 'unexpected';
import { inspect } from 'util';
import Typ from '.';

class Biscuit {}
class Cake {}

const custom = (v) => {
  if (v !== 'custom') {
    throw new Error('nope')
  }
};

describe('Typ.ed', () => {
  it('calls the inner function', () => {
    Typ.ed(arg => {
      expect(arg, 'to be true');
    })(true);
  });

  it('throws when a check fails', () => {
    const Thrower = () => {
      throw new Error('No way mate');
    };

    expect(() => {
      Typ.ed(['theTruth', Thrower], theTruth => {})(true);
    }, 'to throw')
  });

  it('can check multiple values', () => {
    expect(() => {
      Typ.ed(
        ['theTruth', Typ.boolean],
        ['theString', Typ.string],
        (theTruth, theString) => {}
      )(true, 'yes');
    }, 'not to throw');

    expect(() => {
      Typ.ed(
        ['theTruth', Typ.boolean],
        ['theHorror', Typ.String],
        (theLies, theHorror) => {}
      )(true, undefined);
    }, 'to throw');
  });
});

describe('in use', () => {
  it('is good', () => {
    const add =
      Typ.ed(
        ['a', Typ.number],
        ['b', Typ.number],
        (a, b) => a + b
      );

    expect(() => add(1, 2), 'not to throw');
    expect(() => add(1, 'hello!'), 'to throw');
  });
});

describe('expect type checker', () => {
  [
    // any
    [Typ.any, undefined,             'not to throw'],
    [Typ.any, true,                  'not to throw'],
    [Typ.any, false,                 'not to throw'],
    [Typ.any, new Boolean(true),     'not to throw'],
    [Typ.any, new Boolean(false),    'not to throw'],
    [Typ.any, 'hello',               'not to throw'],
    [Typ.any, '',                    'not to throw'],
    [Typ.any, new String('hello'),   'not to throw'],
    [Typ.any, new String(''),        'not to throw'],
    [Typ.any, 0,                     'not to throw'],
    [Typ.any, 1,                     'not to throw'],
    [Typ.any, NaN,                   'not to throw'],
    [Typ.any, new Number(0),         'not to throw'],
    [Typ.any, new Number(1),         'not to throw'],
    [Typ.any, new Number(NaN),       'not to throw'],
    [Typ.any, {},                    'not to throw'],
    [Typ.any, new Object(),          'not to throw'],

    // mixed
    [Typ.mixed, undefined,           'not to throw'],
    [Typ.mixed, true,                'not to throw'],
    [Typ.mixed, false,               'not to throw'],
    [Typ.mixed, new Boolean(true),   'not to throw'],
    [Typ.mixed, new Boolean(false),  'not to throw'],
    [Typ.mixed, 'hello',             'not to throw'],
    [Typ.mixed, '',                  'not to throw'],
    [Typ.mixed, new String('hello'), 'not to throw'],
    [Typ.mixed, new String(''),      'not to throw'],
    [Typ.mixed, 0,                   'not to throw'],
    [Typ.mixed, 1,                   'not to throw'],
    [Typ.mixed, NaN,                 'not to throw'],
    [Typ.mixed, new Number(0),       'not to throw'],
    [Typ.mixed, new Number(1),       'not to throw'],
    [Typ.mixed, new Number(NaN),     'not to throw'],
    [Typ.mixed, {},                  'not to throw'],
    [Typ.mixed, new Object(),        'not to throw'],

    // none
    [Typ.none, undefined,           'not to throw'],
    [Typ.none, true,                'to throw'],
    [Typ.none, false,               'to throw'],
    [Typ.none, new Boolean(true),   'to throw'],
    [Typ.none, new Boolean(false),  'to throw'],
    [Typ.none, 'hello',             'to throw'],
    [Typ.none, '',                  'to throw'],
    [Typ.none, new String('hello'), 'to throw'],
    [Typ.none, new String(''),      'to throw'],
    [Typ.none, 0,                   'to throw'],
    [Typ.none, 1,                   'to throw'],
    [Typ.none, NaN,                 'to throw'],
    [Typ.none, new Number(0),       'to throw'],
    [Typ.none, new Number(1),       'to throw'],
    [Typ.none, new Number(NaN),     'to throw'],
    [Typ.none, {},                  'to throw'],
    [Typ.none, new Object(),        'to throw'],

    // boolean
    [Typ.boolean, undefined,           'to throw'],
    [Typ.boolean, true,                'not to throw'],
    [Typ.boolean, false,               'not to throw'],
    [Typ.boolean, new Boolean(true),   'to throw'],
    [Typ.boolean, new Boolean(false),  'to throw'],
    [Typ.boolean, 'hello',             'to throw'],
    [Typ.boolean, '',                  'to throw'],
    [Typ.boolean, new String('hello'), 'to throw'],
    [Typ.boolean, new String(''),      'to throw'],
    [Typ.boolean, 0,                   'to throw'],
    [Typ.boolean, 1,                   'to throw'],
    [Typ.boolean, NaN,                 'to throw'],
    [Typ.boolean, new Number(0),       'to throw'],
    [Typ.boolean, new Number(1),       'to throw'],
    [Typ.boolean, new Number(NaN),     'to throw'],
    [Typ.boolean, {},                  'to throw'],
    [Typ.boolean, new Object(),        'to throw'],

    // Boolean
    [Typ.Boolean, undefined,           'to throw'],
    [Typ.Boolean, true,                'to throw'],
    [Typ.Boolean, false,               'to throw'],
    [Typ.Boolean, new Boolean(true),   'not to throw'],
    [Typ.Boolean, new Boolean(false),  'not to throw'],
    [Typ.Boolean, 'hello',             'to throw'],
    [Typ.Boolean, '',                  'to throw'],
    [Typ.Boolean, new String('hello'), 'to throw'],
    [Typ.Boolean, new String(''),      'to throw'],
    [Typ.Boolean, 0,                   'to throw'],
    [Typ.Boolean, 1,                   'to throw'],
    [Typ.Boolean, NaN,                 'to throw'],
    [Typ.Boolean, new Number(0),       'to throw'],
    [Typ.Boolean, new Number(1),       'to throw'],
    [Typ.Boolean, new Number(NaN),     'to throw'],
    [Typ.Boolean, {},                  'to throw'],
    [Typ.Boolean, new Object(),        'to throw'],

    // string
    [Typ.string, undefined,           'to throw'],
    [Typ.string, true,                'to throw'],
    [Typ.string, false,               'to throw'],
    [Typ.string, new Boolean(true),   'to throw'],
    [Typ.string, new Boolean(false),  'to throw'],
    [Typ.string, 'hello',             'not to throw'],
    [Typ.string, '',                  'not to throw'],
    [Typ.string, new String('hello'), 'to throw'],
    [Typ.string, new String(''),      'to throw'],
    [Typ.string, 0,                   'to throw'],
    [Typ.string, 1,                   'to throw'],
    [Typ.string, NaN,                 'to throw'],
    [Typ.string, new Number(0),       'to throw'],
    [Typ.string, new Number(1),       'to throw'],
    [Typ.string, new Number(NaN),     'to throw'],
    [Typ.string, {},                  'to throw'],
    [Typ.string, new Object(),        'to throw'],

    // String
    [Typ.String, undefined,           'to throw'],
    [Typ.String, true,                'to throw'],
    [Typ.String, false,               'to throw'],
    [Typ.String, new Boolean(true),   'to throw'],
    [Typ.String, new Boolean(false),  'to throw'],
    [Typ.String, 'hello',             'to throw'],
    [Typ.String, '',                  'to throw'],
    [Typ.String, new String('hello'), 'not to throw'],
    [Typ.String, new String(''),      'not to throw'],
    [Typ.String, 0,                   'to throw'],
    [Typ.String, 1,                   'to throw'],
    [Typ.String, NaN,                 'to throw'],
    [Typ.String, new Number(0),       'to throw'],
    [Typ.String, new Number(1),       'to throw'],
    [Typ.String, new Number(NaN),     'to throw'],
    [Typ.String, {},                  'to throw'],
    [Typ.String, new Object(),        'to throw'],

    // number
    [Typ.number, undefined,           'to throw'],
    [Typ.number, true,                'to throw'],
    [Typ.number, false,               'to throw'],
    [Typ.number, new Boolean(true),   'to throw'],
    [Typ.number, new Boolean(false),  'to throw'],
    [Typ.number, 'hello',             'to throw'],
    [Typ.number, '',                  'to throw'],
    [Typ.number, new String('hello'), 'to throw'],
    [Typ.number, new String(''),      'to throw'],
    [Typ.number, 0,                   'not to throw'],
    [Typ.number, 1,                   'not to throw'],
    [Typ.number, NaN,                 'not to throw'],
    [Typ.number, new Number(0),       'to throw'],
    [Typ.number, new Number(1),       'to throw'],
    [Typ.number, new Number(NaN),     'to throw'],
    [Typ.number, {},                  'to throw'],
    [Typ.number, new Object(),        'to throw'],

    // Number
    [Typ.Number, undefined,           'to throw'],
    [Typ.Number, true,                'to throw'],
    [Typ.Number, false,               'to throw'],
    [Typ.Number, new Boolean(true),   'to throw'],
    [Typ.Number, new Boolean(false),  'to throw'],
    [Typ.Number, 'hello',             'to throw'],
    [Typ.Number, '',                  'to throw'],
    [Typ.Number, new String('hello'), 'to throw'],
    [Typ.Number, new String(''),      'to throw'],
    [Typ.Number, 0,                   'to throw'],
    [Typ.Number, 1,                   'to throw'],
    [Typ.Number, NaN,                 'to throw'],
    [Typ.Number, new Number(0),       'not to throw'],
    [Typ.Number, new Number(1),       'not to throw'],
    [Typ.Number, new Number(NaN),     'not to throw'],
    [Typ.Number, {},                  'to throw'],
    [Typ.Number, new Object(),        'to throw'],

    // Object
    [Typ.Object, undefined,           'to throw'],
    [Typ.Object, true,                'to throw'],
    [Typ.Object, false,               'to throw'],
    [Typ.Object, new Boolean(true),   'not to throw'],
    [Typ.Object, new Boolean(false),  'not to throw'],
    [Typ.Object, 'hello',             'to throw'],
    [Typ.Object, '',                  'to throw'],
    [Typ.Object, new String('hello'), 'not to throw'],
    [Typ.Object, new String(''),      'not to throw'],
    [Typ.Object, 0,                   'to throw'],
    [Typ.Object, 1,                   'to throw'],
    [Typ.Object, NaN,                 'to throw'],
    [Typ.Object, new Number(0),       'not to throw'],
    [Typ.Object, new Number(1),       'not to throw'],
    [Typ.Object, new Number(NaN),     'not to throw'],
    [Typ.Object, {},                  'not to throw'],
    [Typ.Object, new Object(),        'not to throw'],

    // ArrayOf
    [Typ.ArrayOf(Typ.boolean), [true],   'not to throw'],
    [Typ.ArrayOf(Typ.boolean), ['fish'], 'to throw'],

    // optionalOf
    [Typ.optionalOf(Typ.boolean), true,      'not to throw'],
    [Typ.optionalOf(Typ.boolean), undefined, 'not to throw'],
    [Typ.optionalOf(Typ.boolean), 1,         'to throw'],

    // customOf
    [Typ.customOf(custom), 'custom',     'not to throw'],
    [Typ.customOf(custom), 'not custom', 'to throw'],
  ].forEach(([f, v, assertion, ...rest]) => {
    it(`${assertion} for ${f.name} with ${inspect(v, { depth: 3, colors: false })}`, () => {
      expect(() => f(v), assertion, ...rest);
    });
  });
});
