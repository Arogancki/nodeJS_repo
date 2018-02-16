# object-mfr-async
Do a map, filter or reduce async function on object enumerable properties.

### Usage
```js
require('object-mfr-gen')(Object);
// or 
Object = require('object-mfr-gen')();
 
let family = {
    father: 'Homer',
    mother: 'Marge',
    son: 'Bart',
    daughter: 'Lisa',
    dog: 'Santa little helper',
    grandpa: 'Abraham',
    name: 'Simpson'
};
 
// helper function factory
function getFun(greeting){
    return function(val, key, obj){
        return `${greeting} ${val}! (${obj.name}'s ${key})`
    }
}
  
// Object.mapGen
// You can do a different callback function for every property!!
// Get the generator
let mapGen = family.mapGen(getFun('Hello'));
// start the generator
console.log(mapGen.next().value); 
// Hello Homer! (Simpson's father)
// change the callback function
console.log(mapGen.next(getFun('Hi')).value); 
// Hi Marge! (Simpson's mother)
// keep the last the callback function
console.log(mapGen.next().value); 
// Hi Bart! (Simpson's son)
// change again
console.log(mapGen.next(getFun('Greetings')).value); 
// Greetings Lisa! (Simpson's daughter)
  
// Object.filterGen
// You can do a different callback function for every property
// and check if the value has been deleted at the next().value
let filterGen = family.filterGen(function(val, key, obj){
    return val.indexOf('a') !== -1
});
let result1 = filterGen.next().value;
console.log(`${result1.value} is ${result1.deleted ? 'deleted' : 'ok'}.`); 
// Homer is ok.
let result2 = filterGen.next().value;
console.log(`${result2.value} is ${result2.deleted ? 'deleted' : 'ok'}.`); 
// Marge is deleted.
// change the callback function
let result3 = filterGen.next(function(val, key, obj){
    return val.indexOf('i') !== -1
}).value;
console.log(`${result3.value} is ${result3.deleted ? 'deleted' : 'ok'}.`); 
// Bart is ok.
let result4 = filterGen.next().value;
console.log(`${result4.value} is ${result4.deleted ? 'deleted' : 'ok'}.`); 
// Lisa is deleted.
  
// Object.reduceGen
// You can do a different callback function for every property
// and check how the reducing value is changing at next().value
let reduceGen = family.reduceGen(function(previousValue, val, key, obj){
    return ++previousValue;
}, 0);
// start the generator
console.log(`value: ${reduceGen.next().value}`); 
// value: 1
console.log(`value: ${reduceGen.next().value}`); 
// value: 2
// change the callback function
console.log(`value: ${reduceGen.next(function(previousValue, val, key, obj){
    return previousValue*=2;
}).value}`); 
// value: 3
console.log(`$value: ${reduceGen.next().value}`); 
// value: 4
```