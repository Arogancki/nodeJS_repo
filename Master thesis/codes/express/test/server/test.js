require('dotenv').config()
process.env.NODE_ENV = 'TEST'
process.env.MONGO = `mongodb://localhost:27017/expressTest`
process.env.PORT = 3099
process.env.LOG = false

const mongoose = require('mongoose')

    , server = require('../../src/app')
    , sign = require('./sign')
    , app = require('./app')
    , static = require('./static')
    , data = require('./data')

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

describe('Express app tests - functionality', ()=>{
    before(async ()=>{
        config.express = await server()
        await ensureConnection()
        await cleanDatabase()
    })

    static(config)
    sign(config)
    app(config)
    data(config)

    after(async ()=>{
        await cleanDatabase()
        await closeServer(config.express.server)    
    })
})