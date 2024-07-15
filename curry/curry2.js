const  curry = require('@tinkoff/utils/function/curry')
const curryN = require('@tinkoff/utils/function/curryN')

var addFourNumbers = (a, b, c, d) => a + b + c + d;
console.log(addFourNumbers.length); // 4
var curriedAddFourNumbers = curry(addFourNumbers);
var f = curriedAddFourNumbers(1, 2);
console.log(f.length); // 0
console.log(f(3)(4)); 
var g = f(3);
console.log(g(4)); //=> 10


var addAnyNumbers = (...x) => x.reduce((a, b) => a + b, 0);
console.log(addAnyNumbers.length); // 0
console.log(addAnyNumbers(1, 2, 3, 4)); // 10
let curriedaddAnyNumbers = curryN(4, addAnyNumbers);
console.log(curriedaddAnyNumbers(1)(2)(3)(4)); // 10

let a = [5,4,3,2,1];
let cSplice = a.splice.bind(a);
let curriedSplice = curry(cSplice);
let res = curriedSplice(1)(2); 
console.log(res); // [4, 3]
console.log(a); // [5, 2, 1]