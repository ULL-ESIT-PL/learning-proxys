var CallableInstance = require("callable-instance");

class objectFunction extends CallableInstance {
    constructor(a) {
        // CallableInstance accepts the name of the property to use as the callable
        // method.
        super("_call");
        this.function = a;
    }

    _call(arg) {
        let result = this.function(arg);
        //console.log(arg)
        //console.log(result);
        return (typeof result == 'undefined') ? null : result;
    }

    toFunction() {
        return this.function;
    }
}

var obj = new objectFunction(function (a) {
    return a+1;
});

function g(f) {
    f.function = function(u) { return u*u;}
}

console.log(obj(1)); // 2
g(obj);              // obj.function is now u => u*u
console.log(obj(3)); // 9
console.log(obj.toFunction().toString()); // function(u) { return u*u;}
