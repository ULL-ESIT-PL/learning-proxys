## arr-else-function.js

See https://stackoverflow.com/questions/6600868/set-default-value-of-javascript-object-attributes

Example implementing the `else` syntax for data structures:

```javascript
arr = [3, 2, 1] else x => x*x;
```

using a Proxy object.

```javascript
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
```
The output is:

```bash
➜  proxy git:(main) ✗ node arr-else-function.js
81
3 3
4
```

## arr-else-throw.js

Example implementing the syntax: 

```javascript
arr = [3, 2, 1] else name => throw new Error(`Index "${name}" does not exist in array`);;
```

```javascript

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
```

Execution:
  
```bash
➜  proxy git:(main) node arr-else-throw.js 
Index "9" does not exist in array
```

## obj-else-value.js

Consider the syntax 

```javascript
p = { x: 1, y: 1} else 0;
```

```javascript
const handler = {
    get(obj, prop) {
        return prop in obj ? obj[prop] : 0;
    },
    set(obj, prop, value) {
        obj[prop] = value;
    }
};

const p = new Proxy({}, handler);
p.x = 1;
p.y = 1;

console.log(p.x, p.y, p.z); // 1 1 0

p.z = 9;

console.log(p.x, p.y, p.z); // 1 1 9
```

Execution:

```bash
➜  proxy git:(main) ✗ node obj-else-value.js 
1 1 0
1 1 9
```