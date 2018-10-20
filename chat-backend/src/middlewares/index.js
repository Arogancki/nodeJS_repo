const express = require('express')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , nocache = require('nocache')
    , apicache = require('apicache')

    , passport = require('./passport')
    , helmet = require('./helmet')
    , session = require('./session')
    , mongoose = require('./mongoose')
    , rateLimit = require('./rateLimit')
    , { logger } = require('../helpers/log')

module.exports = async (app) => {
    app.use(helmet(app))
    app.use(cookieParser(process.env.SECRET))

    app.use(session)
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(bodyParser.json())
    
    app.use(bodyParser.urlencoded({extended: true}))
   
    process.env.CACHE=='true' 
    ? app.use(apicache.middleware('5 minutes'))
    : app.use(nocache())

    process.env.LIMIT === 'true' 
    && app.use(rateLimit)

    app.use(logger)
    app.use(express.static(app.public))

    app.passport = passport
}