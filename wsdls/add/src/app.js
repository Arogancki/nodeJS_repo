const express = require('express')
    , http = require('http')
    , config = require('./config')
    , middlewares = require('./middlewares')
    , router = require('./router')
    , app = express()
    , log = require('./helpers/log')
    , soap = require('soap')
    , wsdlFile = require('fs-extra').readFileSync(config.WSDL_FILE, 'utf8')
    , service = require('./service.js')
 
module.exports = async ()=>{
    config.PRINT_CONFIG && Object.keys(config).forEach(key=>log.debug(`$${key}=${config[key]}`))

    const wsdl = soap.listen(await new Promise(async res=>{
        const server = http.createServer((request,response)=>response.end('404: Not Found: ' + request.url))
        .listen(config.PORT_WSDL, () => res(server))
    }), '/add', service, wsdlFile)

    const rest = await new Promise(async res=>{
        app.set('port', config.PORT_EXPRESS)
        await middlewares(app)
        await router(app)
        const server = http.createServer(app)
        .listen(
            app.get('port'), () => res({server, app})
        )
    })

    return {
     wsdl, rest   
    }    
}