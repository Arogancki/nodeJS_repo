require('dotenv').config()
process.env.NODE_ENV = 'TEST'
process.env.MONGO = `mongodb://localhost:27017/expressTest`
process.env.PORT = 3099
process.env.LOG = false

const mongoose = require('mongoose')
    , chai = require('chai')
    , agent = require('supertest').agent

    , server = require('../../src/app')
    , helper = require('./helper')
    , authorization = require('./authorization')
    , saveUsersData = require('./saveUsersData')
    , getResources = require('./getResources')

let times = [2000, 10000, 30000]
let config = {}

function ensureConnection() {
    return new Promise(res=>{
        if (mongoose.connection.db) {
            return res(mongoose.connection.db)
        }
        mongoose.connection.on('connected', () =>
            res(mongoose.connection.db)
        )
    })
}

function cleanDatabase() {
    return new Promise(res=>mongoose.connection.db.dropDatabase(res))
}

function closeServer(server){
    return new Promise(res=>{
        server.close(res)
        setTimeout(()=>{
            res(process.exit(0))
        }, 1000)
    })    
}

describe('Express app tests - performance', ()=>{
    before(async ()=>{
        config.express = await server()
        await ensureConnection()
        await cleanDatabase()
        await helper.redirect.post(agent(config.express.app), '/sign/up', {
            username: 'username1',
            password: 'password',
            password2: 'password'
        }, '/')
        console.log()
    })

    for (const time of times)
        describe(`${time} sec`, ()=>{
            before(()=>{
                config.time = time
            })
            authorization(config)
            saveUsersData(config)
            getResources(config)
        })

    after(async ()=>{
        await cleanDatabase()
        await closeServer(config.express.server)    
    })
})