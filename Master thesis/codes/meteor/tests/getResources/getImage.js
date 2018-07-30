const helper = require('../helper')

module.exports = function test(config){
    describe('get image', ()=>
        it('', function (){
            this.timeout(0)
            return Meteor.bindEnvironment(helper.runSimultaneousFun(()=>helper.get('/logo.png'), config.amount)
            .then(time=>{
                console.log(`get image (${config.amount} times): ${time / 1000} sec`)
                return cb()
            }))
        })
    )
}