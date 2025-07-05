// The best way to understand promises is to create a simple implementation of them.

class Pact {
  constructor(fn) {
    this.state = "pending";
    this.value = undefined;
    this.resolveFn = null;
    this.rejectFn = null;

    fn(
      (val) => this.resolveFn(val),
      (err) => this.rejectFn(err)
    );
  }

  resolve(val) {
    if (this.state === "pending") {
      this.state = "resolved";
      this.val = val;
      if (this.resolveFn) this.resolveFn(val);
    }
  }

  reject(err) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.val = err;
      if (this.rejectFn) this.rejectFn(val);
    }
  }

  then(resolveFn) {
    if (this.state === "resolved") {
      resolveFn(this.value);
    } else if (this.state === "pending") {
      this.resolveFn = resolveFn;
    }

    return this;
  }

  catch(rejectFn) {
    if (this.state === "rejected") {
      this.rejectFn(this.value);
    } else if (this.state === "pending") {
      this.rejectFn = rejectFn;
    }

    return this;
  }
}

// we know that when we want to new a Promise, we would pass arguments into resolve and reject.
const pact = new Pact((resolve, reject) => {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((data) => {
      resolve(data);
    })
    .catch((error) => reject(error));
});

pact
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log("error", err));

// when we put async in front of a function, it's a syntactic sugar that wraps returned value in a Promise
async function foo() {
  return 42;
}

// is equivalent to
function bar() {
  return Promise.resolve(42);
}
