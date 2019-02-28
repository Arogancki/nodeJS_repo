const rateLimit = require('express-rate-limit')
    , httpStatuses = require('http-status-codes')
    , config = require('../config')

module.exports = {
    global: function globalLimiter(){
        const limiter = rateLimit({
            windowMs: 5*60*1000, 
            max: 500,
            delayMs: 0,
            handler: (req, res)=>res.sendStatus(httpStatuses.TOO_MANY_REQUESTS)
        })
        return config.LIMITER 
        ? limiter
        : (req, res, next)=>next()
    },
    postAuth: function postAuthLimiter(){
        const limiter = rateLimit({
            windowMs: 60*60*1000, 
            max: 3,
            delayMs: 0,
            handler: (req, res, next)=>next(httpStatuses.TOO_MANY_REQUESTS)
        })
        return config.AUTH_LIMITER 
        ? (req, res)=>new Promise(r=>limiter(req, res, r))
        : (req, res, next)=>next()
    }
}