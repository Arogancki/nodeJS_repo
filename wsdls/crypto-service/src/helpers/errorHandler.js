const log = require('./log')

module.exports = function errorHandler(err, req, res){
    const status = err.httpStatus || 500
    res.statusStatus(status)
    return log.error(err.httpStatus || err.stack)
}