// https://stackoverflow.com/questions/6600868/set-default-value-of-javascript-object-attributes
let handler = {
  get: function(target, name) {
    return target.hasOwnProperty(name) ? target[name] : 42;
  }
};

let emptyObj = {};
let p = new Proxy(emptyObj, handler);

let q = p.answerToTheUltimateQuestionOfLife; //=> 42
console.log(q);

let arr = [ 3,2,1 ];
let s = new Proxy(arr, handler);
let r = s[9];
console.log(r); //=> 42
