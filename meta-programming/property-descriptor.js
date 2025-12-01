const obj1 = Object.getOwnPropertyDescriptor({ x: 1 }, "x");
console.log(obj1); // { value: 1, writable: true, enumerable: true, configurable: true }

let o = {};

Object.defineProperty(o, "x", {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: true,
});

console.log(o.x); // 1
console.log(Object.keys(o)); // []

Object.defineProperty(o, "x", { writable: false });

o.x = 2;
console.log(o.x); // 1

// still configurable
Object.defineProperty(o, "x", { value: 2 });
console.log(o.x); // 2

Object.defineProperty(o, "x", {
  get: function () {
    return 0;
  },
  // value and writable attributes are removed entirely and replaced
  // with `get` and `set`
});
console.log(o.x); // 0

const a = {
  a: 1,
  b: 2,
  c() {
    return this.a + this.b;
  },
};
console.log(a.c());
