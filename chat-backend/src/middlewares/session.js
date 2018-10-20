const session = require('express-session')
    , MemoryStore = require('memorystore')(session)

module.exports = session({
    cookie: { maxAge: 1000*60*60 },
    store: new MemoryStore({
        checkPeriod: 24*60*60*1000,
        secret: process.env.SECRET
    }),
    saveUninitialized: true,
    resave: 'true',
    secret: process.env.SECRET,
})