process.env.NODE_ENV = 'test'

const app = require('../app')
    , mongoose = require('mongoose')
    , agent = require('supertest').agent
    , express = require('express')
    , bodyParser = require('body-parser')
    , portfinder = require('portfinder')
    , appConfig = require('../config')
    , config = {}

function ensureConnection() {
    return new Promise(res=>{
        const mc = mongoose.connection
        mc.on('open',()=>res(mc.db))
        mc.db && res(mc.db)
    })
}

function cleanDatabase() {
    return new Promise(res=>mongoose.connection.db.dropDatabase(res))
}

describe('Testing service', ()=>{
    before(async ()=>{
        await ensureConnection()
        await cleanDatabase()
        const express = await app()
        config.server = express.server
        config.app = express.app
        config.close = express.close
    })

    describe(`PUT`, ()=>{
        it('method has to be valid', async ()=>{
            await agent(config.app)
            .put('/')
            .send({
                uri: 'http://google.com',
                method: 'GETT',
                sec: 20
            })
            .expect(400)
        })
        it('uri has to be valid', async ()=>{
            await agent(config.app)
            .put('/')
            .send({
                uri: 'asoaoaoasi',
                method: 'GET',
                sec: 20
            })
            .expect(400)
        })
        it('sec has to be less than', async ()=>{
            await agent(config.app)
            .put('/')
            .send({
                uri: 'http://google.com',
                method: 'GET',
                sec: appConfig.MAX_TIMER_SEC + 1
            })
            .expect(400)
        })
        it('sec has to be greater than', async ()=>{
            await agent(config.app)
            .put('/')
            .send({
                uri: 'http://google.com',
                method: 'GET',
                sec: appConfig.MIN_TIMER_SEC - 1
            })
            .expect(400)
        })
        it('hook can be added', async ()=>{
            await agent(config.app)
            .put('/')
            .send({
                uri: 'http://google.com',
                method: 'GET',
                sec: appConfig.MIN_TIMER_SEC + 1
            })
            .expect(200)
        })
        it('hook can be fired', async ()=>{
            let hookFired = false
            const app = express()
            const port = await portfinder.getPortPromise()
            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({extended: true}))
            app.post('/', (req, res) => { 
                if (req.body.test === 'hello worlld' && req.headers['user-agent'] === 'mocha'){
                    hookFired = true
                    return res.sendStatus(200) 
                }
                res.sendStatus(400) 
                throw new Error('Invalid body or header element')
            })
            await new Promise(res=>app.listen(port, res))
            await agent(config.app)
            .put('/')
            .send({
                uri: `http://localhost:${port}/`,
                method: 'POST',
                sec: appConfig.MIN_TIMER_SEC + 1,
                body: {
                    'test': 'hello worlld'
                },
                headers: {
                    'user-agent': 'mocha'
                }
            })
            .expect(200)
            await new Promise(res=>setTimeout(res, (appConfig.MIN_TIMER_SEC + 2)*1000))
            if (!hookFired){
                throw new Error('Hook has not been fired on time')
            }
        })
        it('hooks can be reached a few times', async ()=>{
            let hookFiredCounter = 0
            const app = express()
            const port = await portfinder.getPortPromise()
            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({extended: true}))
            app.get('/', (req, res) => {
                if (hookFiredCounter++ >= 3){
                    return res.sendStatus(200)
                }
                return res.sendStatus(400)
            })
            await new Promise(res=>app.listen(port, res))
            await agent(config.app)
            .put('/')
            .send({
                uri: `http://localhost:${port}/`,
                method: 'GET',
                sec: appConfig.MIN_TIMER_SEC,
                retry: {
                    gap: 1,
                    times: -1
                }
            })
            .expect(200)
            await new Promise(res=>setTimeout(res, (appConfig.MIN_TIMER_SEC * 5)*1000))
            if (hookFiredCounter < 3){
                throw new Error('Hook has not been fired enough times')
            }
        })
    })

    describe(`DELETE`, ()=>{
        it('id and token have to be valid', async ()=>{
            await agent(config.app)
            .put('/')
            .send({
                token: 'asdada',
                id: '08d0a'
            })
            .expect(400)
        })
        it('hook can be delated', async ()=>{
            const response = await agent(config.app)
            .put('/')
            .send({
                uri: 'http://google.com',
                method: 'GET',
                sec: appConfig.MIN_TIMER_SEC + 1
            })
            .expect(200)
            await agent(config.app)
            .delete('/')
            .send({
                token: response.body.token,
                id: response.body.id
            })
            .expect(200)
        })
    })

    after(async ()=>{
        await cleanDatabase()
        config.server.close()    
    })
})