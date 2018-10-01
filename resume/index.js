require('dotenv').config()
require('print-env')(console.log)
require('./src/app')()
.then(exp=>console.log(`Server is listening on ${exp.address.address}:${exp.address.port}`))