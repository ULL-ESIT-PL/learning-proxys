function curry(f) {
    let array = [];
    return function (n) {
        console.log('n', n)
        array.push(n);
        return function adder(n) {
            if (n !== undefined) {
                array.push(n);
                return adder;
            }
            else { // terminate
                console.log(array)
                return f(...array);
            }
        }
    }
}

// n-ary function
var f = function (...args) {
    return args.reduce((a, b) => a + b, 0);
};

var sum = curry(f)(1)(2)(3)(4)();
console.log(sum); // 10

var g = function (a, b) {
    return a * b;
}

var product = curry(g)(2)(3)();
console.log(product); // 6

let a = [5, 4, 3, 2, 1];
let cSplice = a.splice.bind(a);
let curriedSplice = curry(cSplice);
let res = curriedSplice(1)(2)();
console.log(res); // [4, 3]

let cConcat = a.concat.bind(a);
let curriedConcat = curry(cConcat);
let res1 = curriedConcat(1)(2)(3)();
console.log(Array.isArray(res1)); // true
console.log(res1); // [5, 4, 3, 2, 1, 1, 2, 3]
