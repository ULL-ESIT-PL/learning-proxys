const target = {
  message1: "hello",
  message2: "everyone",
};

const handler2 = {
  get(target, prop, receiver) {
    console.log("target", target, "prop", prop, "receiver", receiver);
    return "world";
  },
};

const handler3 = {
  get(target, prop, receiver) {
    switch (typeof prop) {
      case "string":
        return prop;
      case "object":
        return prop;
      case "symbol":
        return prop;
    }
    return Reflect.get(...arguments);
  },
};

const proxy3 = new Proxy(target, handler3);

console.log(proxy3.message1); // hello
console.log(proxy3.message2); // world