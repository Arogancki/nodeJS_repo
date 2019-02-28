const crateRouter = require('../../helpers/createRouter')
    , UsersCollection = require('../../models/UsersCollection')
    , errorHandler = require('../../helpers/errorHandler')
    , validJoiScheme = require('../../validators/validJoiScheme')
    , fs = require('fs-extra')
    , config = require('../../config')
    , messageHtml = fs.readFileSync(config.MESSAGE_TEMPLATE_SITE, 'utf8').replace(/%signature%/g, config.SIGNATURE)
    , doneHtml = messageHtml.replace(/%message%/g, 'Email confirmed')
    , notFoundHtml = messageHtml.replace(/%message%/g, '404 Not Found')
    , schemes = require('../../models/schemes')
    , { localConfirmEmailAgainPost } = require('../../policies/limiters')

module.exports = app => {
    return crateRouter([{
        method: "post",
        route: "/again",
        policy: localConfirmEmailAgainPost(),
        validation: validJoiScheme({
            email: schemes.email
        }, 'body'),
        handler: async (req, res)=>{
            try{
                const user = await UsersCollection.sendConfirmationEmail(req.body.email)
                if (!user){
                    return res.status(404).send(notFoundHtml)
                }
                return res.end()
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: "get",
        validation: validJoiScheme({
            u: schemes.id,
            s: schemes.string
        }, 'query'),
        handler: async (req, res)=>{
            try{
                const user = await UsersCollection.validateEmailConfirmationSecret(req.query.u, req.query.s)
                if (!user){
                    return res.status(404).send(notFoundHtml)
                }
                return res.send(doneHtml)
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }])
}