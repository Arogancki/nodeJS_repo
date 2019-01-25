const express = require('express')
    , http = require('http')
    , https = require('https')
    , portfinder = require('portfinder')
    , path = require('path')
    , fs = require('fs-extra')

    , config = require('./config')
    , middlewares = require('./middlewares')
    , router = require('./router')
    , brokenLinkChecker = require('./helpers/brokenLinkChecker')
    , { log } = require('./helpers/log')

    , app = express()

module.exports = async ()=>{
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    app.set('port', config.PORT || await portfinder.getPortPromise())

    app.public = config.APP_PUBLIC
    
    await middlewares(app)
    await router(app)

    config.PRINT_CONFIG && Object.keys(config).forEach(key=>log(`${key}=${config[key]}`))

    return new Promise(async res=>{
        const server = (
            config.HTTPS 
            ? https.createServer({
                key: await fs.readFile(config.SSL_KEY_FILE),
                cert: await fs.readFile(config.SSL_CERT_FILE),
            }, app)
            : http.createServer(app)
        )
        .listen(
            app.get('port'), () => res({
                server, 
                app, 
                protocol: config.HTTPS?'https':'http',
                brokenLinkChecker: brokenLinkChecker
            })
        )
    })
}