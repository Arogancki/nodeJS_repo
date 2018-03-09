const copyObject = function copyObject(obj){
		if (typeof obj === 'object'){
			let copy = {}
			for (let idx in obj) 
				copy[idx] = copyObjectHelper(obj[idx])
			return copy
		}
		return obj
}

const mergeObjects = function mergeObjects(...objs){
		if (objs.length === 1)
			return objs[0];
		if (objs.length > 2)
			return mergeObjects(objs[0], mergeObjects(...objs.slice(1)));
		if (typeof objs[1] !== 'object' || !objs[0] || typeof objs[0] !== 'object')
			return objs[1]
		for(let i in objs[1]){
				objs[0][i] = mergeObjects(objs[0][i], objs[1][i])
				console.log(i)
		}
		return objs[0];
}

module.exports = {
	copyObject: copyObject,
	mergeObjects: mergeObjects
}