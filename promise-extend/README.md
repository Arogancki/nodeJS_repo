# promise-extend
Adds none, first, last, raceLast, any, few and some functions to Promise object.

### Usage
```js
Promise = require('promise-extend')();
// or
require('promise-extend')(Promise);

// An iterable object of promises, such as an Array
let Promises = ...

// use them just like Promise.all or Promise.race
promise = Promise.first(Promises)
promise = Promise.last(Promises)
promise = Promise.lastRace(Promises)
promise = Promise.none(Promises)
promise = Promise.any(Promises)
promise = Promise.some(Promises, minimum)
promise = Promise.few(Promises, maximum)

promise.then(onResolve, onReject)...
```
### Descriptions
##### Promise.first
Takes an iterable collection of promises. Resolves data when a first promise is resolved. Rejects errors if all promises are rejected.
##### Promise.last
Takes an iterable collection of promises. Resolves data of last resolved promise. Rejects errors if all promises are rejected.
##### Promise.lastRace
Takes an iterable collection of promises. Resolves data of last resolved promise. Rejects errors if any promise is rejected.
##### Promise.none
Takes an iterable collection of promises. Resolves errors if all promises are rejected. Rejects data if any promise is resolved.
##### Promise.any
Takes an iterable collection of promises. Resolves data and errors of promises, if any is resolved. Otherwise rejects errors.
##### Promise.some
Takes an iterable collection of promises and minimum amount of promises to resolve (default is 1). Resolves data and errors of promises, when there are minimum amount of resolved. Rejects data and errors of promises, if there are less then minimum resolved.
##### Promise.few
Takes an iterable collection of promises and maximum amount of promises to resolve (default is 0). Resolves data and errors of promises, if there are at the most maximum amount of resolved. Rejects data and errors of promises, if there are more then maximum resolved.  
  