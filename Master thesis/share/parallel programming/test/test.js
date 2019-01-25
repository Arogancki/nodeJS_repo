require('dotenv').config()
process.env.NODE_ENV = 'TEST'
process.env.PORT = 3099
process.env.LOG = false

const server = require('../src/app')
    , matrix = require('./matrix')
    , fractal = require('./fractal')
    , static = require('./static')

let config = {}

function closeServer(server){
    return new Promise(res=>{
        server.close(res)
        setTimeout(()=>{
            res(process.exit(0))
        }, 1000)
    })    
}

describe('Server tests', ()=>{
    before(async ()=>{
        config.express = await server()
    })
    
    static(config)
    matrix(config)
    fractal(config)

    after(async ()=>{
        return closeServer(config.express.server)    
    })
})