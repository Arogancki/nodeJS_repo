# object-mfr-async
Do a map, filter or reduce async function on object enumerable properties.

### Usage
```js
require('object-mfr-async')(Object);
// or 
Object = require('object-mfr-async')();
  
let family = {
    father: 'Homer',
    mother: 'Marge',
    son: 'Bart',
    daughter: 'Lisa',
    name: 'Simpson'
};
  
let caller = {
    greeting: "Hello"
};
  
// do function on every property
await family.mapAsync(function(val, key, obj){
    console.log(`${this.greeting} ${val}! (${obj.name}'s ${key})`);
}, caller);
// Hello Homer! (Simpson's father)
// Hello Marge! (Simpson's mother)
// Hello Bart! (Simpson's son)
// Hello Lisa! (Simpson's daughter)
// Hello Santa little helper! (Simpson's dog)
// Hello Abraham! (Simpson's grandpa)
// Hello Simpson! (Simpson's name)
  
// keep only properties for which function returns true
await family.filterAsync(function(val, key, obj){
    return val.indexOf('a') !== -1
});
  
// do function on every property
// with passed a function previous result
let initialValue = `Simpsons with "a":`;
let result = await family.reduceAsync(function(previousValue, val, key, obj){
    return previousValue+' '+val;
}, initialValue);
  
console.log(result);
// Simpsons with "a": Marge Bart Lisa
```