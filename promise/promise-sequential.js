// Before ES2017 introduced `async` and `await`, it was tricky to sequentially run Promises

function fetchSequentially(urls) {
  const results = [];

  function fetchOne(url) {
    fetch(url)
      .then((res) => {
        return res.body();
      })
      .then((data) => {
        results.push(data);
      });
  }

  let p = Promise.resolve(undefined);

  for (const url of urls) {
    p = p.then(() => fetchOne(url));
  }

  return p.then(() => bodies);
}

function promiseSequence(inputs, promiseMaker) {
  const _inputs = [...inputs];

  function handleNextInputs(outputs) {
    if (_inputs.length === 0) {
      return outputs;
    } else {
      let nextInput = _inputs.shift();
      return promiseMaker(nextInput)
        .then((output) => {
          outputs.concat(output);
        })
        .then(handleNextInputs);
    }
  }

  return Promise.resolve([]).then(handleNextInputs);
}

// example
promiseSequence([1, 2, 3], (n) => {
  return fetch(`example/${n}`).then((res) => res.json());
}).then((results) => {
  console.log(results);
});

// How does `async` work under the hood?
async function f(x) {
  /* body */
}

// same as

function f(x) {
  return new Promise(function (resolve, reject) {
    try {
      resolve(
        (function (x) {
          /** body */
        })(x)
      );
    } catch (error) {
      reject(error);
    }
  });
}

// for/await is another way to run promises sequentially
// for await (const response of promises) {
//   handle(response);
// }
