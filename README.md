# Managed promises

A Promise that can be resolved/rejecter at will!

Have you ever wanted to force the resolution or rejection a promise that is already "running"? Then try this tiny package!

## Install

```bash
$ npm install managed-promise
```

## Usage

```js
const promise = new ManagedPromise(function (resolve) {
  setTimeout(function () {
    resolve('This is taking too loooong...')
  }, 500)
})

setTimeout(function () {
  promise.resolve('Just resolved!!')
}, 250)

promise.then(function (result) {
  console.log(result) // Just resolved!!
})
```

## API

The `ManagedPromise` is a standard `Promise` with two additional properties:

### `resolve(value)`

Forces the resolution of the promise, making the promise chain to move forward.

### `reject(err)`

Forces the rejection of the promise, braking the promise chain right away.

## Motivation

The scenario that led me to this small package was as follows:

I had HTTP requests being fired after a field in the UI changed to validate the input was correct. On response, the UI was updated giving proper feedback to the user.

But as the user kept changing the field, multiple simultaneous requests were done in parallel and the last response always won, even if the responses were received out of order.

Therefore, I needed a way to cancel the ongoing promises every time a new request was about to be fired.

This module does not exactly solve that scenario but was the spark that lit the fire!

## License

WTFPL
