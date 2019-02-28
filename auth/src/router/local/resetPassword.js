const crateRouter = require('../../helpers/createRouter')
    , UsersCollection = require('../../models/UsersCollection')
    , errorHandler = require('../../helpers/errorHandler')
    , validJoiScheme = require('../../validators/validJoiScheme')
    , fs = require('fs-extra')
    , config = require('../../config')
    , resetPasswordHtml = fs.readFileSync(config.RESET_PASSWORD_TEMPLATE_SITE, 'utf8').replace(/%signature%/g, config.SIGNATURE)
    , messageHtml = fs.readFileSync(config.MESSAGE_TEMPLATE_SITE, 'utf8').replace(/%signature%/g, config.SIGNATURE)
    , doneHtml = messageHtml.replace(/%message%/g, 'Done')
    , notFoundHtml = messageHtml.replace(/%message%/g, '404 Not Found')
    , schemes = require('../../models/schemes')

module.exports = app => {
    return crateRouter([{
            method: "get",
            route: '/done',
            handler: async (req, res)=>{
                return res.send(doneHtml)
            }
        }, {
            method: "get",
            validation: validJoiScheme({
                u: schemes.id,
                s: schemes.string
            }, 'query'),
            handler: async (req, res)=>{
                try{
                    const user = await UsersCollection.validatePasswordResetSecret(req.query.u, req.query.s)
                    if (!user){
                        return res.status(404).send(notFoundHtml)
                    }
                    return res.send(resetPasswordHtml)
                }
                catch(err){
                    return errorHandler(err, req, res)
                }
            }
        }, {
            method: "put",
            validation: validJoiScheme({
                email: schemes.email
            }, 'body'),
            handler: async (req, res)=>{
                try {
                    await UsersCollection.sendResetPasswordLink(req.body.email)
                    return res.end()
                }
                catch(err){
                    if (err===403){
                        return res.sendStatus(403)
                    }
                    return errorHandler(err, req, res)
                }
            }
        }, {
            method: "post",
            validation: [
                validJoiScheme({
                    u: schemes.id,
                    s: schemes.string
                }, 'query'),
                validJoiScheme({
                    password: schemes.password,
                    password_confirmation: schemes.password_confirmation
                }, 'body'),
            ],
            handler: async (req, res)=>{
                if (await UsersCollection.changePassword(req.query.u, req.query.s, req.body.password)){
                    return res.end()
                }
                return res.status(404).send(notFoundHtml)
            }
        }])
}