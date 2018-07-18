const agent = require('supertest').agent

    , helper = require('../helper')

module.exports = function test(config){
    describe('get text', ()=>
        it('', ()=>
            helper.signIn(agent(config.express.app), 'username1', 'password')
            .then(agent=>
                helper.doFunctionFor(()=>
                    agent
                    .get('/data')
                    .expect(200)
                    .expect('content-type', 'application/json; charset=utf-8')
                , config.time)
                .then(count=>console.log(`get text (${config.time} sec): ${count}`))
            )
        )
    )
}