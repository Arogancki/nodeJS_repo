const createRouter = require('../../helpers/createRouter')
    , authProxy = require('./authProxy')
    , authenticated = require('../../policies/authenticated')
    , notAuthenticated = require('../../policies/notAuthenticated')

module.exports = app => {
    return createRouter([{
        method: 'delete',
        policy: authenticated,
        handler: [(req, res, next)=>{
            delete req.session.user
            next()
        }, authProxy]
    }, {
        route: /.*/,
        policy: notAuthenticated,
        handler: authProxy
    }])
}