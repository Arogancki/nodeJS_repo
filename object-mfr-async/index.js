const mapAsync = async function mapAsync(callback, thisArg = this){
    if (typeof(callback) !== 'function') throw new TypeError(`callback is not a function`);
    let promises = [];
    for (let el in this){
        promises.push(new Promise((resolve)=>{
            resolve(callback.call(thisArg, this[el], el, this));
        }));
    }
    await Promise.all(promises);
    return Promise.resolve(this);
}

const filterAsync = async function filterAsync(callback, thisArg = this) {
    if (typeof(callback) !== 'function') throw new TypeError(`callback is not a function`);
    let promises = [];
    for (el in this){
        promises.push(new Promise((resolve)=>{
            let callbackResult = callback.call(thisArg, this[el], el, this);
            if (!callbackResult)
                delete this[el];
            resolve(callbackResult);
        }));
    }
    await Promise.all(promises);
    return Promise.resolve(this);
}

const reduceAsync = async function reduceAsync(callback, accumulator = undefined, thisArg = this){
    if (typeof(callback) !== 'function') throw new TypeError(`callback is not a function`);
    for (el in this){
        await new Promise((resolve)=>{
            if (accumulator !== undefined)
                accumulator = callback.call(thisArg, accumulator, this[el], el, this);
            else
                accumulator = this[el];
            resolve(accumulator)
        });
    }
    return Promise.resolve(accumulator);
}

module.exports = function(object = Object){
    object.defineProperty(Object.prototype, 'mapAsync', {
        value: mapAsync,
        enumerable: false
    });
    object.defineProperty(Object.prototype, 'filterAsync', {
        value: filterAsync,
        enumerable: false
    });
    object.defineProperty(Object.prototype, 'reduceAsync', {
        value: reduceAsync,
        enumerable: false
    });
    return object;
}