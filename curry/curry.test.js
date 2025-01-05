curry = require("./curry.js")

const sum = (a,b,c) => {
  return a + b + c
}

const curriedSum = curry(sum);

console.log(curriedSum(2)(5)(7) === 14);
console.log(curriedSum(2,5)(7) === 14);
console.log(curriedSum(2,5,7) === 14);