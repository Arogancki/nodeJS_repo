const log = require('../helpers/log')
    , config = require('../config')

const logger = function logger(req, res, next) {
    req.logger = (...logs) => log.info(` -- ip: ${req.ip} --`, ...logs)
    req.logger(`(${req.ip}) ${req.method}: ${req.url}`)
    if (config.LOG_BODY){
        Object.keys(req.body).length && req.logger('body:', req.body)
        Object.keys(req.params).length && req.logger('params:', req.params)
        Object.keys(req.query).length && req.logger('query:', req.query)
    }
    return next()
}

module.exports = logger