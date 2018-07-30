const helper = require('../helper')

module.exports = function test(config){
    describe('get image', ()=>
        it('', function (){
            this.timeout(config.time*2)
            return Meteor.bindEnvironment(helper.doFunctionFor(()=>helper.get('/logo.png'), config.time)
            .then(count=>{
                console.log(`get image (${config.time} sec): ${count}`)
                return cb()
            }))
        })
    )
}