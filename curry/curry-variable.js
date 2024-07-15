function add (num) {
    function adder (n) {
        if (n !== undefined) {
            num += n; //body
            return adder;
        }
        else { // terminate
            return num;
        }
    }
    return adder;
}

var sum = add(1)(2)(3)(4)();
console.log(sum); // 10