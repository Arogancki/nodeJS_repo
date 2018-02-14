var rp = require('request-promise');
Promise = require('../index.js')();

function promiseFactory(res, rej){
	let promises = []
	for (let i=0; i<res; i++)
		promises.push(rp('http://www.google.com'))
	for (let i=0; i<rej; i++)
		promises.push(rp('http://www.gosdasdasdagshsr.com'),)
	return promises
}

function doTest(fun, res, rej, m){
	fun(promiseFactory(res,rej), m).then(()=>{
		console.log("(S) res: " + fun.name + ": s:" + res + "/f:" + rej + (m?"/m:"+m:""))
	}, ()=>{		
		console.log("(F) rej: " + fun.name + ": s:" + res + "/f:" + rej + (m?"/m:"+m:""))
	})
}

let tests1 = [
	Promise.first,
	Promise.last,
	Promise.raceLast,
	Promise.none,
	Promise.any
]

let tests2 = [
	Promise.few,
	Promise.some
]

let params = [
	{res:0, rej:0},
	{res:1, rej:0},
	{res:0, rej:1},
	{res:3, rej:1},
	{res:1, rej:3},
	{res:3, rej:3}
]

for (let test of tests1)
	for (let param of params)
		doTest(test, param.res, param.rej)
	
for (let test of tests2)
	for (let param of params)
		doTest(test, param.res, param.rej)
	
for (let test of tests2)
	for (let param of params)
		doTest(test, param.res, param.rej, 1)

for (let test of tests2)
	for (let param of params)
		doTest(test, param.res, param.rej, 2)
	
for (let test of tests2)
	for (let param of params)
		doTest(test, param.res, param.rej, 3)

for (let test of tests2)
	for (let param of params)
		doTest(test, param.res, param.rej, 4)