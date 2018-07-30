const helper = require('./helper')

module.exports = function test(config){
    describe('authorization', ()=>
        it('', function (cb){
            this.timeout(config.time*2)
            return Meteor.bindEnvironment(helper.doFunctionFor(()=>helper.signIn('username1'), config.time)
            .then(count=>{
                console.log(`authorization (${config.time} sec): ${count}`)
                return cb()
            }))
        })
    )
}