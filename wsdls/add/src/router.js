const createRouter = require('./helpers/createRouter')
    , log = require('./helpers/log')
    , errorHandler = require('./helpers/errorHandler')
    , soap = require('soap')
    , config = require('./config')

module.exports = async app => {

    const wsdlClient = await soap.createClientAsync(config.URL, {disableCache: true})

    const router = createRouter([{
        method: 'get',
        route: '/getWsdl',
        handler: (req, res)=>res.redirect(wsdlClient.wsdl.uri)
    }, {
        route: '/calculate',
        method: 'post',
        handler: async (req, res)=>{
            try{
                return res.json(await new Promise((res, rej)=>
                    wsdlClient.calculate(req.body, (err, response)=>{
                        err ? rej(err) : res(response)
                    })
                ))
            }
            catch(err){
                log.error(err)
                return res.send(err.body)
            }
        }
    }], [])

    router.use(function notFoundHandler(req, res, next){
        res.sendStatus(404)
        return log.debug(`404 sent`)
    })

    router.use(errorHandler)
    
    app.use(router)
}