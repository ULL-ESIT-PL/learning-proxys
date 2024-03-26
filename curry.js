var curry = require('curry');
 
//-- creating a curried function is pretty
//-- straight forward:
var add = curry(function(a, b){ return a + b });

let c = []
let f = function(arg1, arg2) {
    return c.concat(arg1, arg2)
}
console.log(f(1, 2)); // [1, 2]
let cc = curry(f)

console.log(cc(1)(2)); // [1, 2]

//-- it can be called like normal:
let r = add(1, 2) //= 3
console.log(r);

//-- or, if you miss off any arguments,
//-- a new funtion that expects all (or some) of
//-- the remaining arguments will be created:
var add1 = add(1);
console.log(add1(2)) //= 3;
 