const session = require('express-session')
    , connectMongo = require('connect-mongo')
    , mongoose = require('./mongoose')
    , config = require('../config')

module.exports = async (secret, maxAge) => {
    const store = config.STORE_SESSION_ON_MONGO 
    ? new (connectMongo(session))({ 
        mongooseConnection: ( await mongoose()).connection,
        collection: 'callMeBack-sessions'
    })
    : new session.MemoryStore
    return session({
        name: 'cmb.sid',
        cookie: { maxAge },
        store: store,
        saveUninitialized: true,
        resave: true,
        secret,
    })
}