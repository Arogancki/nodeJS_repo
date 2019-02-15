const config = require('../../config')
    , log = require('../../helpers/log')
    , proxy = require('express-http-proxy')

module.exports = proxy(config.AUTH_SERVICE_ADDRESS, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq)=>{
        log.debug(`proxied to ${config.AUTH_SERVICE_ADDRESS}`)
        return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, req, res)=>{
        const contentType = proxyRes.headers['content-type']
        if (proxyRes.statusCode===200 && contentType==="application/json; charset=utf-8" || contentType==="application/json"){
            try{
                const data = JSON.parse(proxyResData.toString('utf8'))
                if (!data.userId){
                    throw new Error(`Invalid data from auth service`)
                }
                req.session.user = data
                log.trace(`User logged: ${data.userId}`)
                proxyResData = {}
            }
            catch(err){
                throw err
            }
        }
        return proxyResData
    }
})