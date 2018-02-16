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

async function tests(family){
    // do function on every property
    await family.mapAsync(function(val, key, obj){
        console.log(`${this.greeting} ${val}! (${obj.name}'s ${key})`);
    }, caller);

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
}

tests(family)