const { create2DArray } = require('../helpers')

module.exports = function multiplicate(data){
    const m1 = data.m1
    const m2 = data.m2
    if (m1[0].length !== m2.length)
        throw new Error('Matrix dimesnssion does not agree')
    const chunk = Math.ceil(m1.length/data.threads)
    const start = data.id*chunk
    let end = data.id*chunk + chunk
    end = end > m1.length ? m1.length : end
    let r=0
    const result = create2DArray(end-start, m2[0].length)
    for (let count = start; count<end && count<m1.length; count++){
        for (let count2 = 0; count2 < m2[0].length; count2++)
            for (let count3 = 0; count3 < m1[0].length; count3++)
                result[r][count2] += m1[count][count3] * m2[count3][count2]
        r++
    }
    return result
}