# copy-object-helper
Deep copy and deep merge functions, skips all non enumerable params.

### Usage
```js
var coh = require('copy-object-helper')

// deep copy
let obj1 = coh.copyObject({a: {b: [{c: 1, d: 2}]}})

// deep merge (with rest parameters)
let obj2 = coh.mergeObjects(obj1, obj2, obj3...)
```