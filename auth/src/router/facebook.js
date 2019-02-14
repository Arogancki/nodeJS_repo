const crateRouter = require('../helpers/createRouter')
    , notAuthenticated = require('../policies/notAuthenticated')
    , passport = require('passport')

module.exports = app => {
    return crateRouter([{
            method: "get",
            policy: notAuthenticated,
            handler: passport.authenticate('facebook')
        }, {
            route: '/redirect',
            policy: notAuthenticated,
            handler: [passport.authenticate('facebook'), (req, res)=>res.redirect('/done')]
        }])
}