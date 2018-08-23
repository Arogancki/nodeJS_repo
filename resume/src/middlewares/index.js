const express = require('express')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , apicache = require('apicache')

    , helmet = require('./helmet')
    , session = require('./session')
    , i18n = require("./i18n")
    , geolang = require("./geolang")
    , { logger } = require('../helpers/log')
    , { globalLimit } = require('./rateLimit')

module.exports = async (app) => {
    app.enable('trust proxy')

    app.use(helmet(app))
    app.use(cookieParser(process.env.SECRET))
    app.use(session)
    app.use(bodyParser.json())    
    app.use(bodyParser.urlencoded({extended: true}))
    if (!!process.env.limit === 'true')
        app.use(globalLimit)
    app.use(geolang)
    app.use(i18n)
    app.use(logger)
    if (!!process.env.cache === 'true')
        app.use(apicache.middleware('5 minutes'))
    app.use(express.static(app.public))
}