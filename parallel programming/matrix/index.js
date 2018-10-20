const { join } = require('path')

    , threads = require('../threads')
    , { create2DArray } = require('../helpers')
    , multiplicateFun = require('./multiplicate')

function Create(initElements){
    let elements = initElements || [[]]
    return {
        print: function print(){
            return elements.map(row=>`[ ${elements.map(v=>`${v}, `)} ]\n`)
        },
        get: function get(){
            return elements
        },
        setElement: function setElement(e, i, j){
            if (i<0) i = 0
            if (j<0) j = 0
            if (elements.length <= i + 1)
                elements=[
                    ...elements
                    .map(row=>{
                        if (row.length <= j + 1)
                            row = [
                                ...row, 
                                ...new Array(i + 1 - row.length).
                                fill(0)
                            ]
                        return row
                    }),
                    ...create2DArray(i + 1-elements.length, i+1)
                ]
            elements[i][j]=e
            return this
        }
    }
}

function isEqual(m1, m2){
    m1 = m1.get ? m1.get() : m1
    m2 = m2.get ? m2.get() : m2
    if (m1.length !== m2.length || m1[0].length !== m2[0].length)
        return false
    for (const i in m1)
        for (const j in m1)
            if (m1[i][j] !== m1[i][j])
                return false
    return true
}

function multiplicateMatrixes(m1, m2){
    return Create(multiplicate(m1.get(), m2.get()))
}

function multiplicate(m1, m2){
    return multiplicateFun({
        m1,
        m2,
        threads: 1,
        id: 0
    })
}

async function multiplicateMatrixesParallel(m1, m2, threads){
    return Create(await multiplicateParallel(m1.get(), m2.get(), threads))
} 

async function multiplicateParallel(m1, m2, t){
    if (m1.length < t)
        Promise.reject(new Error('Too many threads or too small matrix'))
    return threads.parallel({
        pathToScript: join(__dirname, './multiplicate.js', ),
        data: {
            m1,
            m2
        },
        threads: t
    })
    .then(array=>array.reduce((a, v)=>[...a, ...v], []))
}

exports.isEqual=isEqual
exports.Create=Create
exports.multiplicate=multiplicate
exports.multiplicateParallel=multiplicateParallel
exports.multiplicateMatrixes=multiplicateMatrixes
exports.multiplicateMatrixesParallel=multiplicateMatrixesParallel