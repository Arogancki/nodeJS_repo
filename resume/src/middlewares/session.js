const session = require('express-session')
    , MemoryStore = require('memorystore')(session)
    , config = require('../config')

module.exports = session({
    cookie: { maxAge: config.COOKIE_MAX_AGE },
    store: new MemoryStore({
        checkPeriod: config.COOKIE_MAX_AGE,
        secret: config.SECRET
    }),
    saveUninitialized: true,
    resave: 'true',
    secret: config.SECRET,
})