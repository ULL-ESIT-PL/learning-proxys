// https://stackoverflow.com/questions/6600868/set-default-value-of-javascript-object-attributes
/* Consider the syntax 
arr = [3, 2, 1] else name => throw new Error(`Index "${name}" does not exist in array`);;
*/
let arr = [3, 2, 1];

let handler2 = {
  get: function (target, name) {
    if (target.hasOwnProperty(name))
      return target[name];
    throw new Error(`Index "${name}" does not exist in array`);
  }
};

let s = new Proxy(arr, handler2);
try {
  let r = s[9]; // => Error: Index 9 does not exist in array
} catch (e) {
  console.log(e.message);
}