require('dotenv').config()
require('./src/app')()
.then(exp=>{
    const address = exp.server.address()
    exp.log(`Server is listening on ${address.address}:${address.port}`)
})