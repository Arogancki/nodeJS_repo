const agent = require('supertest').agent

    , helper = require('./helper')

module.exports = function test(config){
    describe('save users data', ()=>
        it('', ()=>
            helper.signIn(agent(config.express.app), 'username1', 'password')
            .then(agent=>
                helper.runSimultaneousFun(()=>agent
                    .post('/data')
                    .send({text: 'some text'})
                    .expect(200)
                    .expect('content-type', 'application/json; charset=utf-8')
                , config.amount)
                .then(time=>console.log(`save users data (${config.amount} times): ${time / 1000} sec`))
            )
        )
    )
}