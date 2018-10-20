const express = require('express')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , cors = require('cors')

    , session = require('./session')
    , { logger } = require('../helpers/log')

module.exports = async (app) => {
    app.enable('trust proxy')

    app.use(cors())
    app.use(cookieParser(process.env.SECRET))
    app.use(session)
    app.use(bodyParser.json())    
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(logger)
}