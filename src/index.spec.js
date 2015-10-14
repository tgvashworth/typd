import expect from 'unexpected';
import { fromJS } from 'immutable';
import Typ from '.';

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
    }, 'to throw', `Argument 'theTruth' did not match expected type 'Thrower'`)
  });
});
