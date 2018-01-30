const map = function(callback, thisArg = this){
    if (typeof(callback) !== 'function') throw new TypeError(`callback is not a function`);
    for (el in this)
        callback.call(thisArg, this[el], el, this);
    return this;
}

const filter = function(){}

const reduce = function(){}

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