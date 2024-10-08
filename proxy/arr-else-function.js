// https://stackoverflow.com/questions/6600868/set-default-value-of-javascript-object-attributes
/* Consider the syntax 
arr = [3, 2, 1] else x => x*x;
*/
let arr = [3, 2, 1];

let handler = {
  get: function (target, name) {
    if (target.hasOwnProperty(name))
      return target[name];
    return Number(name)*Number(name);
  }
};

let s = new Proxy(arr, handler);
try {
  let r = s[9]; // => 81
  console.log(r);
  s[3] = 3;
  console.log(s[3], arr[3]); // => 3 3
  console.log(s["length"]); // => 4
} catch (e) {
  console.log(e.message);
}