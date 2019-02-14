const crateRouter = require('../helpers/createRouter')
    , notAuthenticated = require('../policies/notAuthenticated')
    , validJoiScheme = require('../validators/validJoiScheme')
    , checkBlackListedPasswords = require('../validators/checkBlackListedPasswords')
    , schemes = require('../models/shemes')
    , config = require('../config')
    , localPost = require('../policies/limiters').localPost
    , passport = require('passport')

module.exports = app => {
    return crateRouter([{
        method: "put",
        policy: notAuthenticated,
        validation: [
            validJoiScheme({
                email: schemes.email,
                password: schemes.password,
                password_confirmation: schemes.password_confirmation
            }, 'body'), 
            checkBlackListedPasswords
        ], 
        handler: passport.authenticate('registration', {
            successRedirect : '/done'
        })
    }, {
        method: "post",
        policy: config.AUTH_LIMITER ? [notAuthenticated, localPost()] : notAuthenticated,
        validation: validJoiScheme({
            email: schemes.email,
            password: schemes.password
        }, 'body'),
        handler: passport.authenticate('authorization', {
            successRedirect : '/done'
        })
    }])
}