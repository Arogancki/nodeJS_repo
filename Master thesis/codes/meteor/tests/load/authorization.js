const helper = require('./helper')

module.exports = function test(config){
    describe('authorization', ()=>
        it('', function (cb){
            this.timeout(0)
            return Meteor.bindEnvironment(helper.runSimultaneousFun(()=>helper.signIn('username1'), config.amount)
            .then(time=>{
                console.log(`authorization (${config.amount} times): ${time / 1000} sec`)
                return cb()
            }))
        })
    )
}