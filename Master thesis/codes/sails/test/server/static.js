const agent = require('supertest').agent

module.exports = function test(config){
    describe('static resources', ()=>{
        describe('get', ()=>{
            it('image', ()=>
                agent(config.sails.hooks.http.app)
                .get('/images/logo.png')
                .expect('content-type', 'image/png')
                .expect(200)
            )
            it('video', ()=>
                agent(config.sails.hooks.http.app)
                .get('/videos/video.mp4')
                .expect('content-type', 'video/mp4')
                .expect(200)
            )
        })
    })
}