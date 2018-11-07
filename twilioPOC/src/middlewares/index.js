const express = require('express')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')

    , helmet = require('./helmet')
    , session = require('./session')
    , { logger } = require('../helpers/log')

module.exports = async (app) => {
    app.use(helmet(app))
    app.use(cookieParser(process.env.SECRET))

    app.use(session)
    app.use(bodyParser.json())
    
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(logger)
    app.use(express.static(app.public))
}