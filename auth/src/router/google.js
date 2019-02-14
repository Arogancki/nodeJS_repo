const crateRouter = require('../helpers/createRouter')
    , notAuthenticated = require('../policies/notAuthenticated')
    , passport = require('passport')

module.exports = app => {
    return crateRouter([{
            method: "get",
            policy: notAuthenticated,
            handler: passport.authenticate('google', {
                scope: ['profile']
            })
        }, {
            route: '/redirect',
            policy: notAuthenticated,
            handler: [passport.authenticate('google'), (req, res)=>res.redirect('/done')]
        }])
}