// https://stackoverflow.com/questions/6600868/set-default-value-of-javascript-object-attributes
/* Consider the syntax 
arr = [3, 2, 1] else value;
*/
let arr = [3, 2, 1];

let handler2 = {
  get: function (target, name) {
    if (target.hasOwnProperty(name))
      return target[name];
    return 0;
  }
};

let s = new Proxy(arr, handler2);
try {
  let r = s[9]; // => 0
  console.log(r);
  s[9] = 9;
  console.log(s[9]); // 9
} catch (e) {
  console.log(e.message);
}