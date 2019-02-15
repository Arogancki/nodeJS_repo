const httpStatus = require('http-status-codes')
    , createRouter = require('../helpers/createRouter')
    , config = require('../config')
    , log = require('../helpers/log')
    , getLocalRoutes = require('../helpers/getLocalRoutes')
    , errorHandler = require('../helpers/errorHandler')

module.exports = app => {
    const router = createRouter([], getLocalRoutes(app, __filename))

    router.use(function notFoundHandler(req, res, next){
        res.sendStatus(httpStatus.NOT_FOUND)
        return log.debug(`${httpStatus.NOT_FOUND} sent`)
    })

    router.use(errorHandler)
    
    app.use(router)
}