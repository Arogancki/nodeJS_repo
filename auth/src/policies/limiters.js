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
    },
    localPut: function localPut(){
        const limiter = rateLimit({
            windowMs: 60*60*1000, 
            max: 7,
            delayMs: 0,
            handler: (req, res, next)=>next(httpStatuses.TOO_MANY_REQUESTS)
        })
        return config.AUTH_LIMITER 
        ? (req, res)=>{
            return new Promise(r=>limiter(req, res, r))
        }
        : (req, res, next)=>next()
    },
    localPost: function localPost(){
        const limiter = rateLimit({
            windowMs: 60*60*1000, 
            max: 3,
            delayMs: 0,
            handler: (req, res, next)=>next(httpStatuses.TOO_MANY_REQUESTS)
        })
        return config.AUTH_LIMITER 
        ? (req, res)=>{
            req.session.resetPostAuthLimiter = ()=>limiter.resetIp(req.ip)
            return new Promise(r=>limiter(req, res, r))
        }
        : (req, res, next)=>next()
    },
    localConfirmEmailAgainPost: function localConfirmEmailAgainPost(){
        const limiter = rateLimit({
            windowMs: 3*60*1000, 
            max: 2,
            delayMs: 0,
            handler: (req, res, next)=>next(httpStatuses.TOO_MANY_REQUESTS)
        })
        return (req, res)=>{
            return new Promise(r=>limiter(req, res, r))
        }
    }
}