const helper = require('../helper')

module.exports = function test(config){
    describe('get video', ()=>
        it('', function (cb){
            this.timeout(config.time*2)
            return Meteor.bindEnvironment(helper.doFunctionFor(()=>helper.get('/video.mp4'), config.time)
            .then(count=>{
                console.log(`get video (${config.time} sec): ${count}`)
                return cb()
            }))
        })
    )
}