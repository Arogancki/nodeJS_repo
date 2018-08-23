const RateLimit = require('express-rate-limit')
    , render = require('../helpers/render')

module.exports = {
    globalLimit: new RateLimit({
        windowMs: 5*60*1000, 
        max: 200,
        delayMs: 0,
        handler: (req, res)=>render(req, res.status(429), 'errors/429', {
            remainingTime: res._headers['retry-after']
        })
    }),
    emailLimit: new RateLimit({
        windowMs: 5*60*1000, 
        max: 3,
        delayMs: 0
    })
}