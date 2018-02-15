Promise = require('../index.js')();

function doTests(tests){
    let promises = [];
    for (let test in tests)
        for (let aCase of tests[test].cases)
            promises.push(doTest(tests[test].fun, aCase.res, aCase.rej, aCase.exp, aCase.m));
    return Promise.all(promises);
}

function doTest(fun, res, rej, exp, m){
    return fun(promiseFactory(res,rej), m)
            .then(function(data){
                log(exp, `fun:${fun.name}, res:${res}, rej:${rej}, exp:${exp}, m:${m}`);
            }, function(err){
                log(!exp, `fun:${fun.name}, res:${res}, rej:${rej}, exp:${exp}, m:${m}`);
			});
}

function promiseFactory(res, rej){
    let promises = [];
    let payload = `res:${res}/rej:${rej}`;
    for (let i=0; i<res; i++)
        promises.push(new Promise(function(resolve){
            setTimeout(resolve, 2000, payload)
        }));
    for (let i=0; i<rej; i++)
        promises.push(new Promise(function(undefined, reject){
            setTimeout(reject, 2000, payload)
        }));
    return promises
}

function log(success, logs){
    if (success)
        console.log('PASSED: ' + logs);
    else
        console.error('FAILED: ' + logs);
}

let tests = {
    first: {
        fun: Promise.first,
        cases: [
            {res:0, rej:0, exp: 0},
            {res:1, rej:0, exp: 1},
            {res:0, rej:1, exp: 0},
            {res:3, rej:1, exp: 1},
            {res:1, rej:3, exp: 1},
        ]
    },
    last: {
        fun: Promise.last,
        cases: [
            {res:0, rej:0, exp: 0},
            {res:1, rej:0, exp: 1},
            {res:0, rej:1, exp: 0},
            {res:3, rej:1, exp: 1},
            {res:1, rej:3, exp: 1}
        ]
    },
    raceLast: {
        fun: Promise.raceLast,
        cases: [
            {res:0, rej:0, exp: 0},
            {res:1, rej:0, exp: 1},
            {res:3, rej:0, exp: 1},
            {res:0, rej:1, exp: 0},
            {res:3, rej:1, exp: 0},
            {res:1, rej:3, exp: 0}
        ]
    },
    none: {
        fun: Promise.none,
        cases: [
            {res:0, rej:0, exp: 0},
            {res:1, rej:0, exp: 0},
            {res:3, rej:0, exp: 0},
            {res:0, rej:1, exp: 1},
            {res:3, rej:1, exp: 0},
            {res:0, rej:3, exp: 1}
        ]
    },
    any: {
        fun: Promise.any,
        cases: [
            {res:0, rej:0, exp: 0},
            {res:1, rej:0, exp: 1},
            {res:3, rej:0, exp: 1},
            {res:0, rej:1, exp: 0},
            {res:3, rej:1, exp: 1},
            {res:1, rej:3, exp: 1}
        ]
    },
    few: {
        fun: Promise.few,
        cases: [
            {res:0, rej:0, exp: 0},
            {res:1, rej:1, m: -1, exp: 0},
            {res:1, rej:0, m: 0, exp: 0},
            {res:1, rej:0, m: 1, exp: 1},
            {res:1, rej:0, m: 2, exp: 1},
            {res:3, rej:0, m: 2, exp: 0},
            {res:3, rej:0, m: 3, exp: 1},
            {res:3, rej:0, m: 4, exp: 1},
            {res:0, rej:1, m: 0, exp: 1},
            {res:0, rej:1, m: -1, exp: 0},
            {res:0, rej:1, m: 1, exp: 1},
            {res:3, rej:4, m: 2, exp: 0},
            {res:3, rej:4, m: 3, exp: 1},
            {res:3, rej:4, m: 4, exp: 1},
        ]
    },
    some: {
        fun: Promise.some,
        cases: [
            {res:0, rej:0, exp: 0},
            {res:1, rej:1, m: -1, exp: 1},
            {res:0, rej:1, m: -1, exp: 1},
            {res:1, rej:0, m: 1, exp: 1},
            {res:1, rej:0, m: 2, exp: 0},
            {res:3, rej:0, m: 2, exp: 1},
            {res:3, rej:0, m: 3, exp: 1},
            {res:3, rej:0, m: 4, exp: 0},
            {res:0, rej:1, m: 0, exp: 1},
            {res:0, rej:1, m: 1, exp: 0},
            {res:3, rej:4, m: 2, exp: 1},
            {res:3, rej:4, m: 3, exp: 1},
            {res:3, rej:4, m: 4, exp: 0},
        ]
    },
};

doTests(tests);