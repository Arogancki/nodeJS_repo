const { create2DArray } = require('../helpers')

module.exports = function multiplicate(data){
    const m1 = data.m1
    const m2 = data.m2
    if (m1[0].length !== m2.length){
        throw new Error(`Matrix dimesnssion does not agree: ${m1[0].length}:${m2.length}`)
    }
    let chunk = m1.length/data.threads
    const decimal = chunk%1
    chunk = Math.floor(chunk)
    let extraWork = Math.round(decimal*data.threads)
    let extraWorkStart = data.id===0 ? 0 : data.id<extraWork 
    ? data.id : extraWork
    const start = data.id*chunk + extraWorkStart
    const end = start+chunk+ (data.id<extraWork ? 1: 0)
    let r=0
    const result = create2DArray(end-start, m2[0].length)
    for (let count = start; count<end; count++){
        for (let count2 = 0; count2 < m2[0].length; count2++)
            for (let count3 = 0; count3 < m1[0].length; count3++)
                result[r][count2] += m1[count][count3] * m2[count3][count2]
        r++
    }
    return result
}