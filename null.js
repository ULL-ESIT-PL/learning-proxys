let Null = Object.create(null); // inherit from null

['add', 'mul', 'sub', 'div', 'pow', 'equals', 'lessThan', 'concat'].forEach(
    op => {
        Null[op] = function(other) {
            return other;
        }
    }
);

console.log(Null.prototype); // undefined
console.log(Null.add(2)); // 2
console.log(Null.mul(2)); // 2
console.log(Null.sub(2)); // 2
console.log(Null.div(2)); // 2
console.log(Null.pow(2)); // 2
console.log(Null.equals(2)); // 2
console.log(Null.lessThan(2)); // 2
console.log(Null.concat([3,2])); // [3,2]