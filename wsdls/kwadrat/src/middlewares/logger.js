const log = require('../helpers/log')
    , config = require('../config')

const logger = function logger(req, res, next) {
    log.info(`(${req.ip}) ${req.method}: ${req.url}`)
    if (config.LOG_BODY){
        Object.keys(req.body).length && log.info('body:', req.body)
        Object.keys(req.params).length && log.info('params:', req.params)
        Object.keys(req.query).length && log.info('query:', req.query)
    }
    return next()
}

module.exports = logger