const agent = require('supertest').agent

    , helper = require('./helper')

module.exports = function test(config){
    describe('app', ()=>{
        it('authenticated user can get an app', ()=>
            helper.signIn(agent(config.sails.hooks.http.app), 'username1', 'password')
            .then(agent=>
                helper.checkHTMLTitle(agent, '/', 'Sails app - main'))
        )
        it('unauthenticated user can not get an app', ()=>
            helper.redirect.get(agent(config.sails.hooks.http.app), '/', '/sign/in')
        )
    })
}