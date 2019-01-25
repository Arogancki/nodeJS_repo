const agent = require('supertest').agent
    , {isEqual} = require('../src/matrix')

module.exports = function test(config){
    describe('Matrix', ()=>{
        describe('get', ()=>{
            it(`UI`, ()=>
                agent(config.express.app)
                .get('/matrix/')
                .expect(200)
            )
            it(`own resources`, async ()=>{
                const _agent = agent(config.express.app)
                const data = await new Promise((res, rej)=>
                _agent
                .put('/matrix/')
                .send({matrix: [[1]]})
                .expect(200)
                .end((err, data)=>{
                    if (err) return rej(err)
                    return res(data)
                }))
                return _agent
                .get(`/matrix/${data.body.id}`)
                .expect(res=>{
                    let c = res.status===200
                    ? 200
                    : 302
                    if(res.statusCode!==c){
                        throw new Error(
                            `Invalid status code: ${res.statusCode} - expected ${c}`)
                    }
                })
            })
            it(`somebody elses resources`, ()=>
                agent(config.express.app)
                .get('/matrix/aaaadddd')
                .expect(404)
            )
        })
        describe('delete', ()=>{
            it(`own resources`, async ()=>{
                const _agent = agent(config.express.app)
                const data = await new Promise((res, rej)=>
                _agent
                .put('/matrix/')
                .send({matrix: [[1]]})
                .expect(200)
                .end((err, data)=>{
                    if (err) return rej(err)
                    return res(data)
                }))
                return _agent
                .delete(`/matrix/${data.body.id}`)
                .expect(res=>{
                    let c = res.status===200
                    ? 200
                    : 302
                    if(res.statusCode!==c){
                        throw new Error(
                            `Invalid status code: ${res.statusCode} - expected ${c}`)
                    }
                })
            })
            it(`somebody elses resources`, ()=>
                agent(config.express.app)
                .delete('/matrix/asdasd')
                .expect(404)
            )
        })
        describe('put', ()=>{
            it(`no matrix`, async ()=>
                agent(config.express.app)
                .put('/matrix/')
                .send({})
                .expect(400)
            )
            it(`matrix is not an array`, async ()=>
                agent(config.express.app)
                .put('/matrix/')
                .send({matrix: 'sometext'})
                .expect(400)
            )
            it(`matrix row is not an array`, async ()=>
                agent(config.express.app)
                .put('/matrix/')
                .send({matrix: [[1],'sometext']})
                .expect(400)
            )
            it(`matrix element is not a number`, async ()=>
                agent(config.express.app)
                .put('/matrix/')
                .send({matrix: [['sometext']]})
                .expect(400)
            )
            it(`matrix rows has different sizes`, async ()=>
                agent(config.express.app)
                .put('/matrix/')
                .send({matrix: [[1],[1,2,3]]})
                .expect(400)
            )
            it(`matrix row has no elements`, async ()=>
                agent(config.express.app)
                .put('/matrix/')
                .send({matrix: [[]]})
                .expect(400)
            )
            it(`matrix has too many rows`, async ()=>
                agent(config.express.app)
                .put('/matrix/')
                .send({matrix: new Array(51).fill([1])})
                .expect(400)
            )
            it(`matrix row has too many elements`, async ()=>
                agent(config.express.app)
                .put('/matrix/')
                .send({matrix: [new Array(51).fill(0)]})
                .expect(400)
            )
            it(`small matrix`, async ()=>
                agent(config.express.app)
                .put('/matrix/')
                .send({matrix: [[1]]})
                .expect(200)
            )
            it(`huge matrix`, async ()=>
                agent(config.express.app)
                .put('/matrix/')
                .send({matrix: new Array(50).fill(new Array(50).fill(0))})
                .expect(200)
            )
        })
        describe('post', ()=>{
            describe('multiplicate', ()=>{
                const post = agentFactory()
                it(`no matrixes`, ()=>
                    post(config.express.app, '', '', 1, 400)
                )
                it(`no first matrix`, ()=>
                    post(config.express.app, '', '1x1', 1, 400)
                )
                it(`no second matrix`, ()=>
                    post(config.express.app, '1x1', '', 1, 400)
                )
                it(`matrixes sizes doesn't match`, ()=>
                    post(config.express.app, '1x1', '3x5', 1, 400)
                )
                it(`small matrix 1x1 1 thread`, ()=>
                    post(config.express.app, '1x1', '1x1', 1)
                    .then(matrix=>{
                        if (!isEqual(matrix, new Array(1).fill(new Array(1).fill(4)))){
                            throw 'result matrix invalid'
                        }
                    })
                )
                it(`small matrix 1x1 16 thread`, ()=>
                    post(config.express.app, '1x1', '1x1', 16)
                    .then(matrix=>{
                        if (!isEqual(matrix, new Array(1).fill(new Array(1).fill(4)))){
                            throw 'result matrix invalid'
                        }
                    })
                )
                it(`huge matrix 50x50 1 thread`, ()=>
                    post(config.express.app, '50x50', '50x50', 1)
                    .then(matrix=>{
                        if (!isEqual(matrix, new Array(50).fill(new Array(50).fill(200)))){
                            throw 'result matrix invalid'
                        }
                    })
                )
                it(`huge matrix 50x50 16 thread`, ()=>
                    post(config.express.app, '50x50', '50x50', 16)
                    .then(matrix=>{
                        if (!isEqual(matrix, new Array(50).fill(new Array(50).fill(200)))){
                            throw 'result matrix invalid'
                        }
                    })
                )
                it(`different size matrixes`, ()=>
                    Promise.all([
                        post(config.express.app, '5x3', '3x5', 1),
                        post(config.express.app, '5x3', '3x5', 16)
                    ])
                    .then(matrixes=>{
                        if (!isEqual(matrixes[0], matrixes[1])){
                            throw 'result matrix invalid'
                        }
                    })
                )
            })
        })
    })
}

const agentFactory = function getAgent(){
    let promise=null
    return async (app, m1, m2, threads, code)=>{
        if (promise){
            return promise.then(f=>f(m1, m2, threads, code))
        }
        const _agent = agent(app)
        const matrixes = {}
        const putMatrix=(rows, colums)=>new Promise((res, rej)=>
        _agent.put('/matrix/').send({
            matrix: new Array(rows).fill(new Array(colums).fill(2))
        }).expect(200).end((err, data)=>{
            if (err) return rej(err)
            const key=`${rows}x${colums}`
            const id=data.body.id
            matrixes[key]=id
            return res({id, key})
        }))
        promise = Promise.resolve()
        .then(()=>putMatrix(50, 50))
        .then(()=>putMatrix(1, 1))
        .then(()=>putMatrix(3, 5))
        .then(()=>putMatrix(5, 3))
        .then(_=>{
            return (m1, m2, threads, code)=>new Promise((res, rej)=>
            _agent.post('/matrix/')
            .send({m1: matrixes[m1], m2: matrixes[m2], threads})
            .expect(res=>{
                let c = code 
                ? code
                : res.statusCode===200
                ? 200 
                : 302
                if(res.statusCode!==c){
                    throw new Error(
                        `Invalid status code: ${res.statusCode} - expected ${c}`)
                }
            })
            .end((err, data)=>{
                if (err) return rej(err)
                return code ? res() : res(data.body.matrix)
            }))
        })
        return promise.then(f=>f(m1, m2, threads, code))
    }
}