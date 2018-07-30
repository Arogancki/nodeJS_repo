const helper = require('../helper')

module.exports = function test(config){
    describe('get video', ()=>
        it('', function (cb){
            this.timeout(0)
            return Meteor.bindEnvironment(helper.runSimultaneousFun(()=>helper.get('/video.mp4'), config.amount)
            .then(time=>{
                console.log(`get video (${config.amount} times): ${time / 1000} sec`)
                return cb()
            }))
        })
    )
}