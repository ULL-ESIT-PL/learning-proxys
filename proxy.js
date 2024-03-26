const UNIQUE_KEY = Symbol();

function proximize(target) {
    return new Proxy({ value: target }, { 
        get(getTarget, key, receiver) {
            if (key === UNIQUE_KEY) {
                return getTarget.value;
            }
            if (getTarget.value != null) {
                return proximize(getTarget.value[key]);
            } else {
                return proximize(undefined);
            }
        }
    });
}

function unproximize(proxy) {
  return proxy[UNIQUE_KEY];
}

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

// test it out
let obj = {hello: 'world', long:{a:{c:4}}}
let el = proximize(obj);
console.log(unproximize(el.long)); // {a: {c: 4}}
console.log(unproximize(el.long.a.c)); // 4
console.log(unproximize(el.long.a.c.d)); // undefined


const p = proximize(pikachu); // create a Proxy that wraps pikachu object.
const attack = unproximize(p.stat.attack); // 55
const food = unproximize(p.favorites.food); // undefined
p.speed = 90; // you can set the attribute on Proxy, the original object will be affected.
p.favorites.food = 'ketchup'; // setting food attribute on undefined value has no effect.

unproximize(p.say)(); // "pika pika"
unproximize(p.sing)(); // doesn't have sing function, so no effect.