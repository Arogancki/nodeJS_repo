exports.create2DArray = function create2DArray(l1,l2,v) {
    const arr = new Array(l1)
    for (let index = 0; index < l1; index++) {
        arr[index] = new Array(l2).fill(v||0)
    }
    return arr
}