const createRouter = require('./helpers/createRouter')
    , log = require('./helpers/log')
    , errorHandler = require('./helpers/errorHandler')
    , printer = require('./helpers/printer')
    , soap = require('soap')
    , config = require('./config')

module.exports = async app => {

    const wsdlClient = await soap.createClientAsync(config.URL)

    const router = createRouter([{
        method: 'get',
        route: '/getWsdl',
        handler: (req, res)=>res.redirect(wsdlClient.wsdl.uri)
    }, {
        route: '/CelsiusToFahrenheit',
        method: 'post',
        handler: async (req, res)=>{
            try{
                return res.json(await new Promise((res, rej)=>
                    wsdlClient.CelsiusToFahrenheit(req.body, (err, response)=>{                                                                                     !isNaN(req.body.Celsius) ? res(printer.c(req.body.Celsius)) : 
                        err ? rej(err) : res(response)
                    })
                ))
            }
            catch(err){
                log.error(err)
                return res.send(err.body)
            }
        }
    }, {
        route: '/FahrenheitToCelsius',
        method: 'post',
        handler: async (req, res)=>{
            try{
                return res.json(await new Promise((res, rej)=>
                    wsdlClient.FahrenheitToCelsius(req.body, (err, response)=>{                                                                                     !isNaN(req.body.Fahrenheit) ? res(printer.f(req.body.Fahrenheit)) :
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