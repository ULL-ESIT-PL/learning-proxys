var CallableInstance = require("callable-instance");

class ArrayFunction extends CallableInstance {
    constructor(...a) {
        // CallableInstance accepts the name of the property to use as the callable
        // method.
        super("_call");
        this.array = a;
    }

    toString() {
        return this.array.toString();
    }

    add(other) {
        return this.array.map((x, i) => x + other.array[i]);
    }

    mul(other) {
        return this.array.map((x, i) => x * other.array[i]);
    }

    sub(other) {
        return this.array.map((x, i) => x - other.array[i]);
    }

    div(other) {
        return this.array.map((x, i) => x / other.array[i]);
    }

    equals(other) {
        return this.array.every((x, i) => x === other.array[i]);
    }

    pow(other) {
        return this.array.map((x, i) => x ** other.array[i]);
    }

    neg() {
        return this.array.map(x => -x);
    }

    lessThan(other) {
        return this.array.every((x, i) => x < other.array[i]);
    }

    assign(cacheArgs, cacheValue) { // If f is an array function
        let aux = this.array;
        for (let j = 0; j < cacheArgs.length - 1; j++) {
            aux = aux[cacheArgs[j]];
        }
        aux[cacheArgs[cacheArgs.length - 1]] = cacheValue;
        let result = arr(...this.array);
        return result;
    }

    _call(arg) {
        let result = this.array[arg];
        //console.log(arg)
        //console.log(this.array);

        if (result?.constructor?.name === 'Function') { // Is a JS method of the Array object
            return (...x) => {
                x = x.map(t => t.array ? t.array : t);
                //console.error(deb(x[0].array));
                let s = result.call(this.array, ...x);
                //console.error(deb(s));
                if (Array.isArray(s)) {
                    return arr(...s);
                }
                return s;
            }
        }
        return (typeof result == 'undefined') ? null : result;
    }
}

function arr(...a) {
    return new ArrayFunction(...a);
}

module.exports = { arr, ArrayFunction, CallableInstance };