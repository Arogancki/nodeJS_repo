const result = require('dotenv').config({path: './server/.env'})
require('./src/app')()
.then(exp=>console.log(`Server is listening on ${exp.address.address}:${exp.address.port}`))