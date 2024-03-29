let nothing = function (value) { return value; } // target for proxy


const handler3 = {
    get(target, prop, receiver) {
        console.log('prop', prop)
        return Reflect.get(...arguments);
    },
};

const proxy3 = new Proxy(nothing, handler3);



['add', 'mul', 'sub', 'div', 'pow', 'equals', 'lessThan', 'concat'].forEach(
    op => {
        nothing[op] = function (other) {
            return other;
        }
    }
);


console.log(nothing.prototype); // undefined
console.log(nothing.add(2)); // 2
console.log(nothing.mul(2)); // 2
console.log(nothing.sub(2)); // 2
console.log(nothing.div(2)); // 2
console.log(nothing.pow(2)); // 2
console.log(nothing.equals(2)); // 2
console.log(nothing.lessThan(2)); // 2
console.log(nothing.concat([3, 2])); // [3,2]
console.log(proxy3.splice(1,2));
console.log(nothing(28)); // 28

