const helper = require('./helper')

module.exports = function test(config){
    describe('save users data', ()=>
        it('', function (cb){
            this.timeout(config.time*2)
            return Meteor.bindEnvironment(helper.doFunctionFor(()=>helper.postData('username1', 'some text'), config.time)
            .then(count=>{
                console.log(`save users data (${config.time} sec): ${count}`)
                return cb()
            }))
        })
    )
}