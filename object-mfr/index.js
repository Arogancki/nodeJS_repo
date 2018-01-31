const map = function(callback, thisArg = this){
    if (typeof(callback) !== 'function') throw new TypeError(`callback is not a function`);
    for (el in this)
        callback.call(thisArg, this[el], el, this);
    return this;
}

const filter = function(callback, thisArg = this) {
    if (typeof(callback) !== 'function') throw new TypeError(`callback is not a function`);
    for (el in this){
        if (!callback.call(thisArg, this[el], el, this))
            delete this[el];
    }
    return this;
}

const reduce = function(callback, accumulator = undefined, thisArg = this){
    if (typeof(callback) !== 'function') throw new TypeError(`callback is not a function`);
    for (el in this)
        if (accumulator !== undefined)
            accumulator = callback.call(thisArg, accumulator, this[el], el, this);
        else
            accumulator = this[el];
    return accumulator;
}

module.exports = function(object = Object){
    object.defineProperty(Object.prototype, 'map', {
        value: map,
        enumerable: false
    });
    object.defineProperty(Object.prototype, 'filter', {
        value: filter,
        enumerable: false
    });
    object.defineProperty(Object.prototype, 'reduce', {
        value: reduce,
        enumerable: false
    });
    return object;
} 