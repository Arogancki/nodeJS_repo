const helper = require('./helper')

module.exports = function test(config){
    describe('static resources', ()=>{
        describe('get', ()=>{
            it('image', ()=>
                helper.get('/logo.png')
            )
            it('video', ()=>
                helper.get('/video.png')
            )
        })
    })
}