const coh = require('./index.js')

let obj1 = {
	x: 1,
	y: {
		x: 11,
		z: 12,
	},
	z: {
		x:41,
		y:42
	}
}


let obj2 = {
	y: {
		y: 22,
		z: {
			y: 23
		},
	},
	z:3
}

let obj3 = {
	x: {},
	z:4
}

let i = coh.mergeObjects(obj1, obj2, obj3)