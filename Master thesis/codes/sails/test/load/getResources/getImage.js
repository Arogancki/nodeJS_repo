const agent = require('supertest').agent

    , helper = require('../helper')

module.exports = function test(config){
    describe('get image', ()=>
        it('', ()=>{
            const _agent = agent(config.sails.hooks.http.app)
            return helper.runSimultaneousFun(()=>{
                const _agent = agent(config.sails.hooks.http.app)
                _agent
                .get('images/logo.png')
                .expect('content-type', 'image/png')
                .expect(200)
            }, config.amount)
            .then(time=>console.log(`get image (${config.amount} times): ${time / 1000} sec`))
        })
    )
}