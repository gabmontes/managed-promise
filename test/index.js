const { expect } = require('chai')

const ManagedPromise = require('../lib')

describe('Managed promises', function () {
  it('should resolve as usual', function () {
    const value = 'ok'
    const managed = new ManagedPromise(function (resolve) {
      setTimeout(function () {
        resolve(value)
      }, 0)
    })
    return managed.then(function (result) {
      expect(result).to.equals(value)
    })
  })
  
  it('should reject as usual', function () {
    const message = 'oh no!'
    const managed = new ManagedPromise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error(message))
      }, 0)
    })
    return managed.then(function () {
      throw new Error('should have not been resolved')
    }).catch(function (err) {
      expect(err.message).to.equals(message)
    })
  })
  
  it('should be resolved from the outer world', function () {
    const innerVal = 'inner'
    const outerVal = 'outer'
    const managed = new ManagedPromise(function (resolve) {
      setTimeout(function () {
        resolve(innerVal)
      }, 0)
    })
    managed.resolve(outerVal)
    return managed.then(function (result) {
      expect(result).to.equals(outerVal)
    })
  })
  
  it('should be rejected from the outer world', function () {
    const innerMsg = 'oh no!'
    const outerMsg = 'oh yes!'
    const managed = new ManagedPromise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error(innerMsg))
      }, 0)
    })
    managed.reject(new Error(outerMsg))
    return managed.then(function () {
      throw new Error('should have not been resolved')
    }).catch(function (err) {
      expect(err.message).to.equals(outerMsg)
    })
  })
})



// ---

const abortable = new ManagedPromise(function (resolve) {
  setTimeout(function () {
    resolve('yay!')
  }, 5000)
})

setTimeout(function () {
  abortable.resolve('abort!')
}, 250)

abortable
  .then(function (result) {
    console.log(`ok ${result}`)
  })
  .catch(function (err) {
    console.log(`err ${err}`)
  })
