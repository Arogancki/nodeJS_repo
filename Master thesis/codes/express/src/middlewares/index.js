const express = require('express')
    , bodyParser = require('body-parser')
    , flash = require('connect-flash')
    , cookieParser = require('cookie-parser')

    , passport = require('./passport')
    , helmet = require('./helmet')
    , session = require('./session')
    , mongoose = require('./mongoose')
    , { logger } = require('../helpers/log')

module.exports = async (app) => {
    app.use(helmet(app))
    app.use(cookieParser(process.env.SECRET))

    app.use(session)
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(bodyParser.json())
    
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(flash())
    app.use(logger)
    app.use(express.static(app.public))

    app.passport = passport
}