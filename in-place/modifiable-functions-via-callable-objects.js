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
        return this.cache.get(arg) || this.function(arg);
    }

}

let cf = new CachedFunction(x => x*2);

console.log(cf(1));  // 2
cf.cache.set(1, -1); // Low level version of cf(1) = -1
console.log(cf(1));  // -1