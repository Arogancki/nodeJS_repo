const http = require('http')
    , path = require('path')
    , portfinder = require('portfinder')
    , app = require('express')()

    , socketClusterServer = require('./socketCluster')
    , middlewares = require('./middlewares')
    , router = require('./router')

module.exports = async ()=>{
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    app.set('port', parseInt(process.env.PORT, 10) || await portfinder.getPortPromise())

    await middlewares(app)
    await router(app)

    return new Promise(res=>{
        const server = http.createServer(app)
        const scServer = new socketClusterServer(server)
        server.listen(app.get('port'), ()=>{
            const address = server.address()
            return res({
                server, 
                address, 
                app,
                socketClusterServer: scServer,
            })
        })
    })
}