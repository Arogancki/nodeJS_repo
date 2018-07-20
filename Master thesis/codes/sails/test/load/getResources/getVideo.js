const agent = require('supertest').agent

    , helper = require('../helper')

module.exports = function test(config){
    describe('get video', ()=>
        it('', ()=>{
            return helper.runSimultaneousFun(()=>{
                const _agent = agent(config.sails.hooks.http.app)
                _agent
                .get('videos/video.mp4')
                .expect('content-type', 'video/mp4')
                .expect(200)
            }, config.amount)
            .then(time=>console.log(`get video (${config.amount} times): ${time / 1000} sec`))
        }
        )
    )
}