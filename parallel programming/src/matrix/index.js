const { join } = require('path')
    ,{ performance } = require('perf_hooks')

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

async function multiplicateMatrixes(m1, m2, threads){
    if (threads>1){
        return multiplicateMatrixesParallel(m1, m2, threads)
    }
    const {time, matrix} = await multiplicate(m1.get(), m2.get())
    return {matrix: Create(matrix), time}
}

async function multiplicate(m1, m2, threads){
    threads=1*threads
    if (threads>1){
        return multiplicateParallel(m1, m2, threads)
    }
    const t0 = performance.now()
    const matrix = await multiplicateFun({
        m1,
        m2,
        threads: 1,
        id: 0
    })
    const time = performance.now() - t0
    return {matrix, time, threads: 1}
}

async function multiplicateMatrixesParallel(m1, m2, threads){
    const {time, matrix} = await multiplicateParallel(m1.get(), m2.get(), threads)
    return {matrix: Create(matrix), time}
} 

async function multiplicateParallel(m1, m2, t){
    if (m1.length < t)
        t=m1.length
    const t0 = performance.now()
    return threads.parallel({
        pathToScript: join(__dirname, './multiplicate.js', ),
        data: {
            m1,
            m2
        },
        threads: t
    })
    .then(array=>{
        return {
            time: performance.now() - t0,
            matrix: array.reduce((a, v)=>[...a, ...v], []),
            threads: t
        }
    })
}

exports.isEqual=isEqual
exports.Create=Create
exports.multiplicate=multiplicate
exports.multiplicateMatrixes=multiplicateMatrixes
exports.create2DArray=create2DArray