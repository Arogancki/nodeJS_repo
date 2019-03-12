const express = require('express')
    , http = require('http')
    , config = require('./config')
    , middlewares = require('./middlewares')
    , router = require('./router')
    , app = express()
    , log = require('./helpers/log')
 
module.exports = async ()=>{
    config.PRINT_CONFIG && Object.keys(config).forEach(key=>log.debug(`$${key}=${config[key]}`))

    return await new Promise(async res=>{
        app.set('port', config.PORT_EXPRESS)
        await middlewares(app)
        await router(app)
        const server = http.createServer(app)
        .listen(
            app.get('port'), () => res({server, app})
        )
    })
}