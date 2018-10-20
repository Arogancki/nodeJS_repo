require('dotenv').config({
    path: process.env.NODE_ENV==='production'
    ? './.envProduction'
    : './.envDev'
})
require('./src/app')()
.then(exp=>require('./src/helpers/log').log(`Server is listening on port ${exp.address.port}`))