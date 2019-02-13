const rateLimit = require('express-rate-limit')
    , httpStatuses = require('http-status-codes')
    , config = require('../config')

module.exports = {
    global: function globalLimiter(){
        const limiter = rateLimit({
            windowMs: 5*60*1000, 
            max: 20,
            delayMs: 0,
            handler: (req, res)=>res.sendStatus(httpStatuses.TOO_MANY_REQUESTS)
        })
        return config.LIMITER 
        ? limiter
        : (req, res, next)=>next()
    }
}