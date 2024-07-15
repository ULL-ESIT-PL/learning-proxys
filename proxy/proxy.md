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


## References

* [Proxy Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
* [Create a Null safe world using JavaScript Proxy](https://yiou.me/blog/posts/proxy-deeply-nested-object)

