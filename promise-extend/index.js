// all must be rejected to be resolved
const none = function none(iterable){
    return new Promise( function(resolve, reject){
        let counter = 0;
        let amount = 0;
        let errors = [];
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise).then(reject, function(err){
                errors.put(err)
                if (++counter === amount)
                    resolve(errors)
            });
        }
    });
};

// first resolved is resolved, if any is resolved, errors are rejected
const first = function first(iterable){
    return new Promise(function(resolve, reject){
        let counter = 0;
        let amount = 0;
        let errors = [];
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise).then(resolve, function(err){
                errors.put(err)
                if (++counter === amount)
                    reject(errors)
            });
        }
    });
};

// if last is resolved is resolved, otherway way rejected
const last = function last(iterable){
    return new Promise(function(resolve, reject){
        let counter = 0;
        let amount = 0;
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise)
                .then(function(data){
                    if (++counter === amount)
                        resolve(data)
                }, function(err){
                    if (++counter === amount)
                        reject(err)
                })
        }
    });
};

// if any is rejected it is rejected, last is resolved
const raceLast = function raceLast(iterable){
    return new Promise(function(resolve, reject){
        let counter = 0;
        let amount = 0;
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise)
                .then(function(data){
                    if (++counter === amount)
                        resolve(data)
                }, reject)
        }
    });
};

const some = function some(iterable, minimum){
    return new Promise(function(resolve, reject){
        let counter = 0;
        let amount = 0;
        let errors = [];
        let datas = [];
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise).then(function(data){
                datas.put(data)
                if (++counter === amount)
                    resolve(datas)
            }, function(err){
                errors.put(err)
                if (++counter === amount && datas.length === 0)
                    reject(errors)
            });
        }
    });
};

some - jesli chociaz jeden to juz git
few - musi zostac spelniona ilosc
last succesful - ostatni ktory sie uda zostaje zwrocony

module.exports = function(promise = Promise){
    Object.defineProperty(promise, 'none', {
        value: none,
        enumerable: false
    });
    Object.defineProperty(promise, 'first', {
        value: first,
        enumerable: false
    });
    Object.defineProperty(promise, 'last', {
        value: last,
        enumerable: false
    });
    Object.defineProperty(promise, 'raceLast', {
        value: raceLast,
        enumerable: false
    });
    Object.defineProperty(promise, 'some', {
        value: some,
        enumerable: false
    });
    return promise;
};