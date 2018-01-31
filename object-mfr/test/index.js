require('../index.js')(Object);
 
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
family.map(function(val, key, obj){
    console.log(`${this.greeting} ${val}! (${obj.name}'s ${key})`);
}, caller);
 
// keep only properties for which function returns true
family.filter(function(val, key, obj){
    return val.indexOf('a') !== -1
});
 
// do function on every property 
// with passed a function previous result
let initialValue = `Simpsons with "a":`;
let result = family.reduce(function(previousValue, val, key, obj){
    return previousValue+' '+val;
}, initialValue);

console.log(result);

let req = 'Simpsons with "a": Marge Bart Lisa';
if (result !== req)
	throw Error(`Test has failed: \nres: ${result}\nreq: ${req}`);