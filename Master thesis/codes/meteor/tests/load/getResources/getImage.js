const helper = require('../helper')

module.exports = function test(config){
    describe('get image', ()=>
        it('', function (cb){
            this.timeout(0)
            Meteor.bindEnvironment(helper.runSimultaneousFun(()=>helper.get('/logo.png'), config.amount)
            .then(time=>{
                console.log(`get image (${config.amount} times): ${time / 1000} sec`)
                cb()
            }))
        })
    )
}