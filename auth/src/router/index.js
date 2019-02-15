const httpStatuses = require('http-status-codes')
    , createRouter = require('../helpers/createRouter')
    , log = require('../helpers/log')
    , getLocalRoutes = require('../helpers/getLocalRoutes')
    , errorHandler = require('../helpers/errorHandler')
    , authenticated = require('../policies/authenticated')
    
module.exports = async app => {
    const router = createRouter([{
        policy: authenticated,
        route: '/done',
        handler: function done(req, res, next){
            return res.json({userId: req.user._id.toString()})
        }
    }, {
        method: "delete",
        policy: authenticated,
        handler: function deAuthorization(req, res, next){
            req.logout()
            return res.end()
        }
    }], getLocalRoutes(app, __filename))

    router.use(function notFoundHandler(req, res){
        res.sendStatus(httpStatuses.NOT_FOUND)
        return log.debug(httpStatuses.NOT_FOUND)
    })

    router.use(errorHandler)
    
    app.use(router)
}