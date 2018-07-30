const helper = require('./helper')

module.exports = function test(config){
    describe('app', ()=>{
        it('user can get an app', ()=>
            helper.get('/app')
        )
    })
}