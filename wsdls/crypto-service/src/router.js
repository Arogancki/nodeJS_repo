const createRouter = require('./helpers/createRouter')
    , log = require('./helpers/log')
    , errorHandler = require('./helpers/errorHandler')
    , soap = require('soap')
    , config = require('./config')

/*
// testing crypto on startup
;(()=>{
    const str = '1mojTajny$tring!%@'
        , pass = '1mojTajny$Pass!%@'
    crypto.algorithms.forEach(algorithm=>{
        try{
            if (crypto.decipher(
                    crypto.cipher(str, pass, algorithm), pass, algorithm
                )!==str){
                    throw new Error()
            }
        }
        catch(err){
            log.error(`Algorithm: ${algorithm} does not work!`)
        }
    })
})()
*/

module.exports = async app => {

    const wsdlClient = await soap.createClientAsync(config.URL, {disableCache: true})

    const router = createRouter([{
        method: 'get',
        route: '/getWsdl',
        handler: (req, res)=>res.redirect(wsdlClient.wsdl.uri)
    }, {
        method: 'get',
        route: '/getAlgorithms',
        handler: async (req, res)=>{
            try{
                return res.send((await wsdlClient.getAlgorithmsAsync())[0])
            }
            catch(err){
                log.error(err)
                return res.send(err.body)
            }
        }
    },{
        route: '/decipher',
        method: 'post',
        handler: async (req, res)=>{
            try{
                return res.send((await wsdlClient.decipherAsync(req.body))[0])
            }
            catch(err){
                log.error(err)
                return res.send(err.body)
            }
        }
    }, {
        route: '/cipher',
        method: 'post',
        handler: async (req, res)=>{
            try{
                return res.send((await wsdlClient.cipherAsync(req.body))[0])
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