
// a neutral element for all oeprations

const Neutral = function (x) { 
    return x; 
};
Neutral.toString = function() { return ""; }

//Neutral.toString = function() { return ""; }

class FallbackHandler {
    constructor(target) {
        this.target = target;
    }

    get(target, prop, receiver) {
        console.log("prop=",prop, "type=", typeof target[prop]) ;
        if (typeof target[prop] === 'function') {
            return target[prop].bind(target); // Ensure methods are bound to the target object
        } else if (typeof target[prop] === 'undefined') {
            return (x) => x; // Implement fallback behavior here
        } else {
            return target[prop];
        }
    }
}

const neutral = new Proxy(Neutral, new FallbackHandler());
String.prototype.add = function (x) { 
    console.log(x === neutral);
    if (x == neutral) return this.toString();
    return this+x;
}

Number.prototype.add = function (x) { 
    if (x == neutral) return Number(this);
    return this+x;
}
// Test method calls
console.error("hello".add(neutral)); // Output: hello
console.error(neutral.add("world")); // Output: world
console.error("neutral length = ",neutral.length); // 1
console.log(neutral.add(4)); // Output: 4
console.log("4.add(neutral) = ",(4).add(neutral)); // Output: 4
console.log("hello".add(neutral).add(" world"))
console.error(neutral.mul(4)); // Output: 4
console.error(neutral(5)); // Output: 5
//console.log(yProxy.fallback('Fallback executed')); // Output: Fallback executed
