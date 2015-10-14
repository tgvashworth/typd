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
    const thrower = () => {
      throw new Error('No way mate');
    }

    expect(() => {
      Typ.ed(['arg', thrower], () => {})(true);
    }, 'to throw', `Argument 'arg' did not match expected type`)
  });
});
