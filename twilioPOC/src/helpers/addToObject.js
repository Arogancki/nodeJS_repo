module.exports = function addToObject(root, obj, ...path){
    if (path.length === 0){
        throw new Error('Path is undefined')
    }
    if (path.length === 1){
        root[path[0]] = 
        root[path[0]] && root[path[0]][Symbol.iterator] === 'function'
        ? {...root[path[0]], ...obj}
        : obj
        return
    }
    root[path[0]] = root[path[0]] || {}
    return addToObject(root[path[0]], obj, ...path.slice(1))
}