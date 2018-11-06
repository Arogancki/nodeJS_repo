const agent = require('supertest').agent

module.exports = function test(config){
    describe('Fractal', ()=>{
        describe('get', ()=>{
            it(`UI`, ()=>
                agent(config.express.app)
                .get('/fractal/')
                .expect(200)
            )
            it(`own resources`, async ()=>{
                const _agent = agent(config.express.app)
                const data = await new Promise((res, rej)=>
                _agent
                .put('/fractal/')
                .send({width:100, height:100, threads:1})
                .expect(200)
                .end((err, data)=>{
                    if (err) return rej(err)
                    return res(data)
                }))
                return _agent
                .get(`/fractal/${data.body.id}`)
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
                .get('/fractal/aaaadddd')
                .expect(404)
            )
        })
        describe('delete', ()=>{
            it(`own resources`, async ()=>{
                const _agent = agent(config.express.app)
                const data = await new Promise((res, rej)=>
                _agent
                .put('/fractal/')
                .send({width:100, height:100, threads:1})
                .expect(200)
                .end((err, data)=>{
                    if (err) return rej(err)
                    return res(data)
                }))
                return _agent
                .delete(`/fractal/${data.body.id}`)
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
                .delete('/fractal/asdasd')
                .expect(404)
            )
        })
        describe('put', ()=>{
            it(`no width`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({height:100, threads:1})
                .expect(400)
            )
            it(`no height`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width:100, threads:1})
                .expect(400)
            )
            it(`no threads`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({height:100, width:100})
                .expect(400)
            )
            it(`width too small`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width:1, height:100, threads:1})
                .expect(400)
            )
            it(`width too big`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width: 12001, height:100, threads:1})
                .expect(400)
            )
            it(`height too small`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width:100, height:1, threads:1})
                .expect(400)
            )
            it(`height too big`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width: 100, height:12001, threads:1})
                .expect(400)
            )
            it(`too few threads`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width: 100, height:100, threads:0})
                .expect(400)
            )
            it(`too many threads`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width: 100, height:100, threads:17})
                .expect(400)
            )
            it(`1 thread small size`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width: 20, height:20, threads:1})
                .expect(200)
            )
            it(`1 thread huge size`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width: 12000, height:12000, threads:1})
                .expect(200)
            )
            it(`16 thread small size`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width: 20, height:20, threads:16})
                .expect(200)
            )
            it(`16 thread huge size`, async ()=>
                agent(config.express.app)
                .put('/fractal/')
                .send({width: 12000, height:12000, threads:16})
                .expect(200)
            )
        })
    })
}