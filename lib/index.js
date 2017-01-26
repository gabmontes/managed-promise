function ManagedPromise(resolver) {
  let resolveFn, rejectFn
  const promise = new Promise(function (resolve, reject) {
    resolveFn = resolve
    rejectFn = reject
    resolver(resolve, reject)
  })
  promise.resolve = resolveFn
  promise.reject = rejectFn
  return promise
}

module.exports = ManagedPromise
