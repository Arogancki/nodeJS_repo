const httpStatuses = require('http-status-codes')

module.exports = function notAuthenticated(req, res){
    if (req.session.user){
        return httpStatuses.UNAUTHORIZED
    }
}