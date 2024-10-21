class Callable extends Function {
    constructor() {
        super('...args', 'return this._bound._call(...args)')
        this._bound = this.bind(this)

        return this._bound
    }
}

class CachedFunction extends Callable {
    constructor(f) {
        super()
        this.function = f;
        this.cache = new Map();
    }

    _call(arg) {
        if (typeof this.cache.get(arg) !== 'undefined') return this.cache.get(arg);
        return this.function(arg);
    }

}

let cf = new CachedFunction(x => x*2);

console.log(cf(1));  // 2
cf.cache.set(1, -1); // Low level version of cf(1) = -1
console.log(cf(1));  // -1
console.log(cf(0));  // 0 fixed bug for falsy values. Commented by Boriel
cf.cache.set(0, -2); // Low level version of cf(0) = -2
console.log(cf(0));  // -2