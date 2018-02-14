// takes an iterable collection of promises
// resolves errors if all promises are rejected
// rejects data if any promise is resolved
const none = function none(iterable){
    return new Promise( function(resolve, reject){
        let counter = 0;
        let amount = 0;
        let errors = [];
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise).then(reject, function(err){
                errors.push(err);
                if (++counter === amount)
                    resolve(errors);
            });
        }
        if (!amount)
            reject('No promises passed');
    });
};

// takes an iterable collection of promises
// resolves data when a first promise is resolved
// rejects errors if all promises are rejected
const first = function first(iterable){
    return new Promise(function(resolve, reject){
        let counter = 0;
        let amount = 0;
        let errors = [];
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise).then(resolve, function(err){
                errors.push(err);
                if (++counter === amount)
                    reject(errors);
            });
        }
        if (!amount)
            reject('No promises passed');
    });
};

// takes an iterable collection of promises
// resolves data of last resolved promise
// rejects errors if all promises are rejected
const last = function last(iterable){
    return new Promise(function(resolve, reject){
        let counter = 0;
        let amount = 0;
        let errors = [];
        let lastData;
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise)
                .then(function(data){
                    if (++counter === amount)
                        resolve(data);
                    lastData = data;
                }, function(err){
                    errors.push(err);
                    if (++counter === amount)
                        if (lastData)
                            resolve(lastData);
                    reject(errors);
                })
        }
        if (!amount)
            reject('No promises passed');
    });
};

// takes an iterable collection of promises
// resolves data with a last resolved promise
// rejects errors if any promise is rejected
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
        if (!amount)
            reject('No promises passed');
    });
};

// takes an iterable collection of promises and
// minimum amount of promises to resolve (default 1)
// resolves data and errors of promises, when there are minimum resolved
// rejects data and errors of promises, if there are less then minimum resolved
const some = function some(iterable, minimum = 1){
    return new Promise(function(resolve, reject){
        let counter = 0;
        let amount = 0;
        let errors = [];
        let datas = [];
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise)
                .then(function(data){
                        datas.push(data)
                        if (datas.length === minimum)
                            resolve({
                                data: datas,
                                errors
                            })
                        if (++counter === amount)
                            reject({
                                data: datas,
                                errors
                            })
                    }, function(err){
                        errors.push(err)
                        if (++counter === amount)
                            reject({
                                data: datas,
                                errors
                            })
                    }
                );
        }
        if (!amount)
            reject('No promises passed');
    });
};

// takes an iterable collection of promises and
// maximum amount of promises to resolve (default 0)
// resolves data and errors of promises, if there are at the most maximum resolved
// rejects data and errors of promises, if there are more then maximum resolved
const few = function some(iterable, maximum = 0){
    return new Promise(function(resolve, reject){
        let counter = 0;
        let amount = 0;
        let errors = [];
        let datas = [];
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise)
                .then(function(data){
                        datas.push(data)
                        if (datas.length > maximum)
                            reject({
                                data: datas,
                                errors
                            })
                        if (++counter === amount)
                            resolve({
                                data: datas,
                                errors
                            })
                    }, function(err){
                        errors.push(err)
                        if (++counter === amount)
                            resolve({
                                data: datas,
                                errors
                            })
                    }
                );
        }
        if (!amount)
            reject('No promises passed');
    });
};

// takes an iterable collection of promises
// resolves data and errors of promises, if any is resolved
// otherwise rejects errors
const any = function some(iterable){
    return new Promise(function(resolve, reject){
        let counter = 0;
        let amount = 0;
        let errors = [];
        let datas = [];
        for (let promise of iterable){
            amount++;
            Promise.resolve(promise)
                .then(function(data){
                        datas.push(data)
                        if (++counter === amount)
                            resolve({
                                data: datas,
                                errors
                            })
                    }, function(err){
                        errors.push(err)
                        if (++counter === amount)
                            if (datas.length === 0)
                                reject(errors)
                            else
                                resolve({
                                    data: datas,
                                    errors
                                })
                    }
                );
        }
        if (!amount)
            reject('No promises passed');
    });
};

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
    Object.defineProperty(promise, 'few', {
        value: few,
        enumerable: false
    });
    Object.defineProperty(promise, 'any', {
        value: any,
        enumerable: false
    });
    return promise;
};