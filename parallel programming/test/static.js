const agent = require('supertest').agent

module.exports = function test(config){
    describe('static resources', ()=>{
        describe('navigation page', ()=>{
            it('index.html', ()=>
                agent(config.express.app)
                .get('/')
                .expect('content-type', 'text/html; charset=utf-8')
                .expect(200)
            )
        })
        describe('css files', ()=>{
            it('index.css', ()=>
                agent(config.express.app)
                .get('/index.css')
                .expect('content-type', 'text/css; charset=UTF-8')
                .expect(200)
            )
            it('fractal.css', ()=>
                agent(config.express.app)
                .get('/fractal.css')
                .expect('content-type', 'text/css; charset=UTF-8')
                .expect(200)
            )
            it('matrix.css', ()=>
                agent(config.express.app)
                .get('/matrix.css')
                .expect('content-type', 'text/css; charset=UTF-8')
                .expect(200)
            )
        })
        describe('.js files', ()=>{
            it('fractal.js', ()=>
                agent(config.express.app)
                .get('/fractal.js')
                .expect('content-type', 'application/javascript; charset=UTF-8')
                .expect(200)
            )
            it('matrix.js', ()=>
                agent(config.express.app)
                .get('/matrix.js')
                .expect('content-type', 'application/javascript; charset=UTF-8')
                .expect(200)
            )
        })
        describe('.png files', ()=>{
            it('fractal.png', ()=>
                agent(config.express.app)
                .get('/fractal.png')
                .expect('content-type', 'image/png')
                .expect(200)
            )
            it('matrix.png', ()=>
                agent(config.express.app)
                .get('/matrix.png')
                .expect('content-type', 'image/png')
                .expect(200)
            )
        })
    })
}