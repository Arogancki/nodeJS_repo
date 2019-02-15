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
            console.log('No test implemented :(')
        })
    })

    after(async ()=>{
        await cleanDatabase()
        config.server.close()    
    })
})