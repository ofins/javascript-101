class AsyncQueue {
  constructor() {
    this.values = [];
    this.resolvers = [];
  }

  enqueue(value) {
    if (this.resolvers.length > 0) {
      // If someone is already waiting for next value -> provide immediately
      this.resolvers.shift()(value);
    } else {
      // Else, buffer it for later.
      this.values.push(value);
    }
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  next() {
    if (this.values.length > 0) {
      return Promise.resolve({ value: this.values.shift(), done: false });
    } else {
      return new Promise((resolve) => {
        // "Waiting" consumer is represented by `resolve` function.
        this.resolvers.push((value) => resolve({ value, done: false }));
      });
    }
  }
}

function eventStream(elt, type) {
  const q = new AsyncQueue();
  elt.addEventListener(type, (e) => q.enqueue(e));
  return q;
}

async function handleKeys() {
  for await (const event of eventStream(document, "keypress")) {
    console.log(event.key);
  }
}

handleKeys();
