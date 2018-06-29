const express = require('express')
    , http = require('http')
    , portfinder = require('portfinder')
    , path = require('path')

    , middlewares = require('./middlewares')
    , router = require('./router')

    , app = express()

module.exports = async ()=>{
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    app.set('port', parseInt(process.env.PORT, 10) || await portfinder.getPortPromise())

    app.public = process.env.APP_PUBLIC || path.join(__dirname, `public`)

    await middlewares(app)
    await router(app)
    
    return server = http.createServer(app).listen(app.get('port'), "127.0.0.1", ()=>{
        const address = server.address()
        console.log(`Server is listening on ${address.address}:${address.port}`)
    })
}