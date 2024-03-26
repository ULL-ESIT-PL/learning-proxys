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