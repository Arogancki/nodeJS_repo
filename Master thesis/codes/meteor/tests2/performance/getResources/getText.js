const helper = require('../helper')

module.exports = function test(config){
    describe('get text', ()=>
        it('', function (cb){
            this.timeout(config.time*2)
            return Meteor.bindEnvironment(helper.doFunctionFor(()=>helper.getData('username1'), config.time)
            .then(count=>{
                console.log(`get text (${config.time} sec): ${count}`)
                return cb()
            }))
        })
    )
}