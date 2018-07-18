const agent = require('supertest').agent

    , helper = require('./helper')

module.exports = function test(config){
    describe('authorization', ()=>
        it('', ()=>{
            const _agent = agent(config.express.app)
            return helper.doFunctionFor(()=>
                helper.redirect.post(_agent, '/sign/in', {
                    username: 'username1',
                    password: 'password'
                }, '/')
            , config.time)
            .then(count=>console.log(`authorization (${config.time} sec): ${count}`))
        })
    )
}