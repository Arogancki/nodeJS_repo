const helper = require('../helper')

module.exports = function test(config){
    describe('get text', ()=>
        it('', function (cb){
            this.timeout(0)
            return Meteor.bindEnvironment(helper.runSimultaneousFun(()=>helper.getData('username1'), config.amount)
            .then(time=>{
                console.log(`get text (${config.amount} times): ${time / 1000} sec`)
                return cb()
            }))
        })
    )
}