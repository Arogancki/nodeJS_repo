const helper = require('../helper')

module.exports = function test(config){
    describe('out', ()=>{
        describe('get', ()=>{
            it('user can sign out', ()=>
                helper.signOut('username1', 'password')
            )
        })
    })
}