const createRouter = require('../../helpers/createRouter')
    , authProxy = require('./authProxy')

module.exports = app => {
    return createRouter([{
        route: /.*/,
        handler: authProxy
    }])
}