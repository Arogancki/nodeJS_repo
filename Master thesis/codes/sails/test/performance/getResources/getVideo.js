const agent = require('supertest').agent

    , helper = require('../helper')

module.exports = function test(config){
    describe('get video', ()=>
        it('', ()=>
            helper.doFunctionFor(()=>
                agent(config.sails.hooks.http.app)
                .get('/videos/video.mp4')
                .expect('content-type', 'video/mp4')
                .expect(200)
            , config.time)
            .then(count=>console.log(`get video (${config.time} sec): ${count}`))
        )
    )
}