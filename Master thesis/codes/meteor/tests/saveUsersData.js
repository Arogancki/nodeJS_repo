const helper = require('./helper')

module.exports = function test(config){
    describe('save users data', ()=>
        it('', function (cb){
            this.timeout(0)
            return Meteor.bindEnvironment(helper.runSimultaneousFun(()=>helper.postData('username1', 'some text'), config.amount)
            .then(time=>{
                console.log(`save users data (${config.amount} times): ${time / 1000} sec`)
                return cb()
            }))
        })
    )
}