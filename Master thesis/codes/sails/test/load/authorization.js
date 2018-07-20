const agent = require('supertest').agent

    , helper = require('./helper')

module.exports = function test(config){
    describe('authorization', ()=>
        it('', ()=>
            helper.runSimultaneousFun(()=>helper.redirect.post(agent(config.sails.hooks.http.app), '/sign/in', {
                    username: 'username1',
                    password: 'password'
                }, '/')
            , config.amount)
            .then(time=>console.log(`authorization (${config.amount} times): ${time / 1000} sec`))
        )
    )
}