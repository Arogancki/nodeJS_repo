const express = require('express')
    , fs = require('fs')
    , http = require('http')
    , portfinder = require('portfinder')
    , path = require('path')

    , middlewares = require('./middlewares')
    , router = require('./router')
    , socket = require('./socket')

    , app = express()
 
module.exports = async ()=>{
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    app.set('port', parseInt(process.env.PORT, 10) || await portfinder.getPortPromise())
    
    app.public = process.env.APP_PUBLIC || path.join(__dirname, `public`)

    await middlewares(app)
    await router(app)
    return new Promise(res=>{
        const server = http.createServer(app)
        .listen(app.get('port'), ()=>{
            return res({
                server, 
                address: server.address(),
                app,
                socket: socket(server)
            })
        })
    })
}