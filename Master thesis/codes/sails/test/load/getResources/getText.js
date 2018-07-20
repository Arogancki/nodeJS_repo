const agent = require('supertest').agent

    , helper = require('../helper')

module.exports = function test(config){
    describe('get text', ()=>
        it('', ()=>
            helper.signIn(agent(config.sails.hooks.http.app), 'username1', 'password')
            .then(agent=>
                helper.runSimultaneousFun(()=>
                    agent
                    .get('/data')
                    .expect(200)
                    .expect('content-type', 'application/json; charset=utf-8')
                , config.amount)
                .then(time=>console.log(`get text (${config.amount} times): ${time / 1000} sec`))
            )
        )
    )
}