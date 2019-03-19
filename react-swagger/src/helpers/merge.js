const typeOfObject = typeof {}

function mergeProp(obj0, obj1, key){
    if (!obj0.hasOwnProperty(key)){
        return obj1[key]
    }
    if (!obj1.hasOwnProperty(key)){
        return obj0[key]
    }
    const type0 = typeof obj0[key]
    const type1 = typeof obj1[key]
    if (type0 !== type1){
        throw new Error(`Cannot merge objects on key: ${key} - different types (${type0} - ${type1})`)
    }
    if (type0 === typeOfObject){
        return merge(obj0[key], obj1[key])
    }
    return obj0[key] + obj1[key]
}

function merge(...objects){
    if (objects.length<=1){
        return objects[0] || {}
    }
    if (objects.length>2){
        return merge(objects.shift(), merge(...objects))
    }
    return [...new Set([
        ...Object.keys(objects[0]), 
        ...Object.keys(objects[1])
    ])].reduce((merged, key)=>{
        merged[key] = mergeProp(objects[0], objects[1], key)
        return merged
    }, {})
}

export default merge