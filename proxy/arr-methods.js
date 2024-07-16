// https://stackoverflow.com/questions/6600868/set-default-value-of-javascript-object-attributes
/* Consider the syntax 
arr = [3, 2, 1] else x => x*x;
*/
let arr = [3, 2, 1];

let handler2 = {
  get: function (target, name) {
    if (name in target)
      return target[name];
    return 0;
  }
};

let s = new Proxy(arr, handler2);
try {
  let r = s[9]; // => 0
  console.log(r);
  s[3] = 3;
  console.log(s[3]); // => 3
  console.log(s["length"]); // => 4
  console.log(s["join"]("-")); // => 9-4-1-16
} catch (e) {
  console.log(e.message);
}