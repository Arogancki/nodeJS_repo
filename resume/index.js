require('dotenv').config()
if (process.env.EMAIL_PASSWORD==false){
    throw new Error('EMAIL_PASSWORD is not provided!')
}
require('./src/app')().then(exp=>{
    const address = exp.server.address()
    console.log(`Server is listening on ${address.address}:${address.port}`)
})