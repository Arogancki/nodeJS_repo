const agent = require('supertest').agent

    , helper = require('../helper')

module.exports = function test(config){
    describe('get image', ()=>
        it('', ()=>
            helper.doFunctionFor(()=>
                agent(config.express.app)
                .get('/logo.png')
                .expect('content-type', 'image/png')
                .expect(200)
            , config.time)
            .then(count=>console.log(`get image (${config.time} sec): ${count}`))
        )
    )
}