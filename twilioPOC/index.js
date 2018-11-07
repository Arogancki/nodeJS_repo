const assert = require('assert')
require('dotenv').config({
    path: process.env.NODE_ENV==='production'
    ? './.envProduction'
    : './.envDev'
})
require('./envNess.json').forEach(v=>
    assert(process.env.hasOwnProperty(v), `Environment variable '${v}' is not defined`)
)
require('print-env')(require('./src/helpers/log').log)
require('./src/app')().then(exp=>{
    const address = exp.server.address()
    console.log(`Server is listening on ${address.address}:${address.port}`)
})