require('dotenv').config()
require('./src/app')()
.then(exp=>console.log(`Server is listening on ${exp.address.address}:${exp.address.port}`))