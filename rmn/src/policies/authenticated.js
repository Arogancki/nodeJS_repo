const httpStatuses = require('http-status-codes')

module.exports = function authenticated(req, res){
    if (!req.session.user){
        return httpStatuses.UNAUTHORIZED
    }
}