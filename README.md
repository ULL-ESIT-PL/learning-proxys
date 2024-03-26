## Currying

While many JavaScript array methods indeed take only one parameter or accept a variable number of arguments, there are a few methods that require more than one compulsory argument. Here are some examples:

1. **Array.prototype.splice()**: This method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. It takes at least two compulsory arguments: the start index and the number of elements to remove.

   Example:
   ```javascript
   const array = [1, 2, 3, 4, 5];
   array.splice(2, 1); // Removes 1 element starting from index 2
   console.log(array); // Output: [1, 2, 4, 5]
   ```

2. **Array.prototype.copyWithin()**: This method shallow copies part of an array to another location in the same array and returns it, without modifying its size. It requires at least two compulsory arguments: the target index and the start index.

   Example:
   ```javascript
   const array = [1, 2, 3, 4, 5];
   array.copyWithin(0, 3); // Copies elements starting from index 3 to the beginning of the array
   console.log(array); // Output: [4, 5, 3, 4, 5]
   ```

3. **Array.prototype.fill()**: This method fills all the elements of an array from a start index to an end index with a static value. It requires at least one compulsory argument, the value to fill the array with, and can take up to two additional arguments for the start and end indices.

   Example:
   ```javascript
   const array = [1, 2, 3, 4, 5];
   array.fill(0, 2, 4); // Fills the array with 0 from index 2 to 4
   console.log(array); // Output: [1, 2, 0, 0, 5]
   ```

These are some examples of JavaScript array methods that require more than one compulsory argument.

## References

* [Proxy Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
* [Create a Null safe world using JavaScript Proxy](https://yiou.me/blog/posts/proxy-deeply-nested-object)

## Goal

[Yiou](https://yiou.me/blog/posts/proxy-deeply-nested-object)) wants to implement a function `proximize` that takes an object and returns a Proxy object. The `unproximize` function unwraps a Proxy and returns the value.

The Proxy object should be able to access the original object's attributes and functions.

```js
const pikachu = {
  name: 'pikachu',
  stats: {
    HP: 35,
    attack: 55,
    defend: 50
  },
  say: function() {
    console.log('pika pika');
  }
};

const p = proximize(pikachu); // create a Proxy that wraps pikachu object.
const attack = unproximize(p.stat.attack); // 55
const food = unproximize(p.favorites.food); // undefined
p.speed = 90; // you can set the attribute on Proxy, the original object will be affected.
p.favorites.food = 'ketchup'; // setting food attribute on undefined value has no effect.
p.say(); // "pika pika"
p.sing(); // doesn't have sing function, so no effect.
```

Proxy is a  feature in ES2017. 
It's a  tool to customize some fundamental operations on an object. 
Those  operations include 
1. getting an attribute, 
2. setting an attribute, 
3. calling the function (if the object is a function), 

etc. It's a wrapper that **intersects** certain access to the object.

```js
const hero = {
    name: 'batman'
}

const proxy = new Proxy(hero, {
    get(target, key, receiver) {
        console.error('target', target, 'key', key, 'receiver', receiver); // target { name: 'batman' } key name receiver { name: 'batman' }
        return 'nananana' + target[key];
    }
});

console.log(proxy.name); //nanananabatman
```

The `get` handler intercepts the read access to object's property and customize the return. 

Now, we are going to proxy the original object so that, 

- When accessing a property, we return a Proxy instead. 
- The returned Proxy has the same structure as the first proxy, but it wraps a different value (the property of the original object). 

If a proxy wraps `undefined` or `null`, 
accessing any property from the Proxy should return a new Proxy that wraps `undefined`.
 This way, we will never have direct access to an `undefined`/`null` value.

 ```js
 function proximize(target) {
    return new Proxy({ value: target }, { 
        get(getTarget, key, receiver) {
            if (getTarget.value != null) {
                return proximize(getTarget.value[key]);
            } else {
                return proximize(undefined);
            }
        }
    });
}
```