const bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , nocache = require('nocache')
    , cors = require('./cors')
    , config = require('../config')
    , limiter = require('../policies/limiters').global
    , helmet = require('./helmet')
    , session = require('./session')
    , mongoose = require('./mongoose')
    , requireHTTPS = require('./requireHTTPS')
    , logger = require('./logger')

module.exports = async (app) => {
    app.use(helmet(app))
    app.use(requireHTTPS)
    app.use(cookieParser(config.SESSION_SECRET))
    app.use(await session(config.SESSION_SECRET, config.COOKIE_MAX_AGE))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(limiter())
    if (config.NO_CACHE){
        app.use(nocache())
    }
    if (config.CORS){
        app.use(cors(app))
    }
    app.use(logger)
    await mongoose()
}