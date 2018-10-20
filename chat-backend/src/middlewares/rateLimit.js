const RateLimit = require('express-rate-limit')

module.exports = new RateLimit({
    windowMs: 5*60*1000, 
    max: 200,
    delayMs: 0
})