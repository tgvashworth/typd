/**
 * Create a typed function. Takes a list of 'checks' and a final callback that is being guarded.
 *
 * Returns a function.
 */
function typed(...args) {
  const fn = args[args.length - 1];
  const checks = args.slice(0, args.length - 1);
  return function (...innerArgs) {
    checks.forEach(([argName, check]) => {
      try {
        check(...innerArgs);
      } catch (e) {
        throw new Error(`Argument '${argName}' did not match expected type '${check.name}'`)
      }
    });
    return fn.call(this, ...innerArgs);
  };
}

export default {
  ed: typed
};
