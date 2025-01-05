function curry(fn) {
  const arity = fn.length;
  return function curried(...args) {
    if(args.length >= arity) {
      return fn(...args);
    }
    else {
      return function(...args2) {
        return curried(...args, ...args2);
      }
    }
  }
}

module.exports = curry;