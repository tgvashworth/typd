/**
 * Create a typed function. Takes a list of 'checks' and a final callback that is being guarded.
 *
 * Returns a function.
 */
function typed(...args) {
  const fn = args[args.length - 1];
  const checks = args.slice(0, args.length - 1);
  return function (...innerArgs) {
    checks.forEach(([argName, check], i) => {
      try {
        check(innerArgs[i]);
      } catch (e) {
        throw new Error(`${e.message.replace(/MATCH/g, argName)}`);
      }
    });
    return fn.call(this, ...innerArgs);
  };
}

const exports = {
  ed: typed,
  any: (MATCH: any) => {},
  mixed: (MATCH: mixed) => {},
  none: (MATCH: void) => {},
  boolean: (MATCH: boolean) => {},
  Boolean: (MATCH: Boolean) => {},
  string: (MATCH: string) => {},
  String: (MATCH: String) => {},
  number: (MATCH: number) => {},
  Number: (MATCH: Number) => {},
  Object: (MATCH: Object) => {},
  ArrayOf: check => (arr: Array<any>) => arr.forEach(exports.customOf(check)),
  optionalOf: check => v => {
    if (typeof v !== 'undefined') {
      check(v);
    }
  },
  customOf: check => v => check(v)
};

export default exports;
