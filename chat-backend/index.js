require('dotenv').config({
    path: process.env.NODE_ENV==='production'
    ? './.envProduction'
    : './.envDev'
})
require('./envNess.json').forEach(v=>
    process.env[v]===undefined && (()=>{throw new Error(`Environment var '${v}' is not defined`)})())
require('print-env')(console.log)
require('./src/app')()
.then(exp=>require('./src/helpers/log').log(`Server is listening on port ${exp.address.port}`))