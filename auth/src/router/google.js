const crateRouter = require('../helpers/createRouter')
    , notAuthenticated = require('../policies/notAuthenticated')
    , passport = require('passport')
    , config = require('../config')

module.exports = app => {
    return crateRouter([{
            method: "get",
            policy: notAuthenticated,
            handler: passport.authenticate('google', {
                scope: ['profile']
            })
        }, {
            route: '/done',
            policy: notAuthenticated,
            handler: [passport.authenticate('google'), (req, res)=>res.redirect(config.DONE_REDIRECT)]
        }])
}