const crateRouter = require('../../helpers/createRouter')
    , notAuthenticated = require('../../policies/notAuthenticated')
    , validJoiScheme = require('../../validators/validJoiScheme')
    , checkBlackListedPasswords = require('../../validators/checkBlackListedPasswords')
    , getLocalRoutes = require('../../helpers/getLocalRoutes')
    , schemes = require('../../models/schemes')
    , config = require('../../config')
    , { localPost, localPut} = require('../../policies/limiters')
    , passport = require('passport')

module.exports = app => {
    return crateRouter([{
        method: "put",
        policy: config.AUTH_LIMITER ? [notAuthenticated, localPut()] : notAuthenticated,
        validation: [
            validJoiScheme({
                email: schemes.email,
                password: schemes.password,
                password_confirmation: schemes.password_confirmation
            }, 'body'), 
            checkBlackListedPasswords
        ], 
        handler: passport.authenticate('registration', {
            successRedirect : config.DONE_REDIRECT,
        })
    }, {
        method: "post",
        policy: config.AUTH_LIMITER ? [notAuthenticated, localPost()] : notAuthenticated,
        validation: validJoiScheme({
            email: schemes.email,
            password: schemes.password
        }, 'body'),
        handler: passport.authenticate('authorization', {
            successRedirect : config.DONE_REDIRECT,
        })
    }], getLocalRoutes(app, __filename))
}