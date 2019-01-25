const express = require('express')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , compression = require('compression')
    , nocache = require('nocache')
    , cors = require('./cors')
    , helmet = require('./helmet')
    , session = require('./session')
    , i18n = require("./i18n")
    , geolang = require("./geolang")
    , { logger } = require('../helpers/log')
    , { globalLimit } = require('./rateLimit')
    , config = require('../config')

module.exports = async (app) => {
    app.enable('trust proxy')

    app.use(helmet(app))
    app.use(cookieParser(config.SECRET))
    app.use(session)
    app.use(bodyParser.json())    
    app.use(bodyParser.urlencoded({extended: true}))
    if (config.LIMIT === 'true'){
        app.use(globalLimit)
    }
    if (config.NO_CACHE){
        app.use(nocache())
    }
    if (config.CORS){
        app.use(cors(app))
    }
	app.use(compression())
    app.use(geolang)
    app.use(i18n)
    app.use(logger)
    app.use(express.static(app.public, {
        maxage: '1h'
    }))
}