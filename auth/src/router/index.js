const httpStatuses = require('http-status-codes')
    , createRouter = require('../helpers/createRouter')
    , getLocalRoutes = require('../helpers/getLocalRoutes')
    , errorHandler = require('../helpers/errorHandler')
    , authenticated = require('../policies/authenticated')
    , config = require('../config')
    , fs = require('fs-extra')
    , messageHtml = fs.readFileSync(config.MESSAGE_TEMPLATE_SITE, 'utf8').replace(/%signature%/g, config.SIGNATURE)
    , notFoundHtml = messageHtml.replace(/%message%/g, '404 Not Found')
    , UsersCollection = require('../models/UsersCollection')
    
module.exports = async app => {
    const router = createRouter([{
        policy: authenticated,
        route: '/done',
        handler: async function done(req, res, next){
            const user = await UsersCollection.findOne({_id: req.user._id.toString()})
            if (!user){
                return res.sendStatus(401)
            }
            if (user.provider==='LOCAL' && user.localProvider.emailConfirmed===false){
                return res.json({error: 'Email not confirmed', email: user.id})
            }
            return res.json({userId: user._id.toString()})
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
        return res.status(httpStatuses.NOT_FOUND).send(notFoundHtml)
    })

    router.use(errorHandler)
    
    app.use(router)
}