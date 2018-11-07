const session = require('express-session')

module.exports = session({
    cookie: { maxAge: 1000*60*60*24 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: process.env.SECRET,
})