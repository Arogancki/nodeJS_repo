const mapGen = function* mapGen(callback, thisArg = this){
    for (el in this){
        if (typeof(callback) !== 'function') throw new TypeError(`callback is not a function`);
        let newCallback = yield callback.call(thisArg, this[el], el, this);
        newCallback ? callback = newCallback : '';
    }
    return this;
}

const filterGen = function* filterGen(callback, thisArg = this) {
    for (el in this){
        if (typeof(callback) !== 'function') throw new TypeError(`callback is not a function`);
        isToDelete = callback.call(thisArg, this[el], el, this);
        let toYield = {
            value: this[el],
            deleted : isToDelete
        };
        if (isToDelete)
            delete this[el];
        let newCallback = yield toYield;
        newCallback ? callback = newCallback : '';
    }
    return this;
}

const reduceGen = function* reduceGen(callback, accumulator = undefined, thisArg = this){
    for (el in this) {
        if (typeof(callback) !== 'function') throw new TypeError(`callback is not a function`);
        if (accumulator === undefined)
            accumulator = this[el];
        else{
            let newCallback = yield (accumulator = callback.call(thisArg, accumulator, this[el], el, this));
            newCallback ? callback = newCallback : '';
        }
    }
    return accumulator;
}

const runner = function runner(gen){
    let it = gen();
    let results = [];
    it.next();
    for (let res = it.next(); !res.done; res = it.next())
        results.push(res);
    return results;
}

module.exports = function(object = Object){
    object.defineProperty(Object.prototype, 'mapGen', {
        value: mapGen,
        enumerable: false
    });
    object.defineProperty(Object.prototype, 'filterGen', {
        value: filterGen,
        enumerable: false
    });
    object.defineProperty(Object.prototype, 'reduceGen', {
        value: reduceGen,
        enumerable: false
    });
    object.defineProperty(Object.prototype, 'runner', {
        value: runner,
        enumerable: false
    });
    return object;
}