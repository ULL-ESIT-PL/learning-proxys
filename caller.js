const util = require('util');
const ins = x => util.inspect(x, { depth: null });
function myFunc() {
    if (myFunc.caller === null) {
        return "The function was called from the top!";
    } else {
        return `This function's caller was ${ins(myFunc.caller)}`;
    }
}

function g() {
    console.log(myFunc());
}

g(); // This function's caller was [Function: g]

console.log("global");
myFunc(); // The function was called from the top!