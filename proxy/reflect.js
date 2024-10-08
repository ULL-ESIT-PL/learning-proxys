const target = {
    message1: "hello",
    message2: "everyone",
    a: 4,
};

const handler3 = {
    get(target, prop, receiver) {
        if (prop === "message2") {
            return "world";
        }
        return Reflect.get(...arguments);
    },
};

const proxy3 = new Proxy(target, handler3);

console.log(proxy3.message1); // hello
console.log(proxy3.message2); // world
console.log(proxy3.a); // 4
