const session = require('express-session')
    , connectMongo = require('connect-mongo')(session)
    , mongoose = require('./mongoose')
    , config = require('../config')

module.exports = async (secret, maxAge) => session({
    name: 'auth.sid',
    cookie: { secure: config.HTTPS, maxAge },
    store: new connectMongo({ 
        mongooseConnection: ( await mongoose()).connection,
        collection: 'auth-sessions'
    }),
    saveUninitialized: true,
    resave: false,
    secret,
})