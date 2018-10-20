const express = require('express')
    , bodyParser = require('body-parser')
    , nocache = require('nocache')

    , helmet = require('./helmet')
    , { logger } = require('../helpers/log')

module.exports = async (app) => {
    app.use(helmet(app))

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
   
    app.use(nocache())

    app.use(logger)

    app.use(express.static(app.public))
}