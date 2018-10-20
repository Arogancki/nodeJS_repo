const matrix = require('./index')

const m1 = matrix.Create([
    [132,23,58, 58], 
    [0,0,0,587], 
    [578,578,578,578]
])

const m2 = matrix.Create([
    [754, 45, 9754, 459, 954], 
    [549, 593, 96, 0, 539], 
    [359, 359, 359, 359, 359],
    [359, 3579, 12312, 0, 95]
])

console.log(
    '\nisEqual', matrix.isEqual(m1, m1) && !matrix.isEqual(m1, m2) ? 'passed' : 'failed', 
    '\nmultiplicate', matrix.isEqual(matrix.multiplicateMatrixes(m1, m2), matrix.Create([
        [153799,	247983,	2024654,	81410,	164657],
        [210733,	2100873,	7227144,	0,	55765],
        [1168138,	2644928,	13017138,	472804,	1125366]
    ])) ? 'passed' : 'failed',
    '\nsetElement', m1.setElement(0,1,1).get()[1][1]===0 ? 'passed' : 'failed'
)

matrix.multiplicateParallel(m1.get(), m2.get())
.then(d=>{
    console.log('multiplicate parallel', matrix.isEqual(d, matrix.Create([
        [153799,	247983,	2024654,	81410,	164657],
        [210733,	2100873,	7227144,	0,	55765],
        [1168138,	2644928,	13017138,	472804,	1125366]
    ])) ? 'passed' : 'failed',)
})
.catch(e=>console.error(e.stack || e.message))