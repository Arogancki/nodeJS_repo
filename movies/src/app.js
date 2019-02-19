const express = require('express')
    , http = require('http')
    , config = require('./config')
    , middlewares = require('./middlewares')
    , router = require('./router')
    , app = express()
    , log = require('./helpers/log')
 
module.exports = async ()=>{
    app.set('port', config.PORT)

    await middlewares(app)
    await router(app)

    config.PRINT_CONFIG && Object.keys(config).forEach(key=>log.debug(`$${key}=${config[key]}`))

    return new Promise(async res=>{
        const server = http.createServer(app)
        .listen(app.get('port'), () => res({server, app}))
    })
}