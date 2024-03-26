function add(f) {
    return function (num) {
        return function adder(n) {
            if (n !== undefined) {
                num = f(num, n); //body
                return adder;
            }
            else { // terminate
                return num;
            }
        }
    }
}

var f = function (arg1, arg2) {
    return arg1 + arg2;
};

var sum = add(f)(1)(2)(3)(4)();
console.log(sum); // 10