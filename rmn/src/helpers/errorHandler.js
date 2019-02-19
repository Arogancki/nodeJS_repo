const httpStatuses = require('http-status-codes')
    , config = require('../config')
    , log = require('./log')

module.exports = function errorHandler(err, req, res){
    const status = err.httpStatuses || httpStatuses.INTERNAL_SERVER_ERROR
    res.status(status).send(
        config.NODE_ENV !== 'production' 
        ? err.stack 
        : httpStatuses.getStatusText(status)
    )
    return log.error(err.stack)
}