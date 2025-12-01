const sayHi = new Function("name", 'console.log("hi " + name)');

sayHi("Jack"); // "Hi, Jack"

const add = new Function("a", "b", "return a + b");

console.log(add(1, 2)); // logs 3

console.log(add instanceof Function); // true
console.log(add instanceof Object); // true
