/* Consider the syntax 
p = { x: 1, y: 1} else 0;
*/
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
