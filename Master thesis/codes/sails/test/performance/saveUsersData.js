const agent = require('supertest').agent

    , helper = require('./helper')

module.exports = function test(config){
    describe('save users data', ()=>
        it('', ()=>
            helper.signIn(agent(config.sails.hooks.http.app), 'username1', 'password')
            .then(agent=>
                helper.doFunctionFor(()=>
                    agent
                    .post('/data')
                    .send({text: 'some text'})
                    .expect(200)
                    .expect('content-type', 'application/json; charset=utf-8')
                , config.time)
                .then(count=>console.log(`save users data (${config.time} sec): ${count}`))
            )
        )
    )
}