const bodyParser = require('body-parser')
    , cors = require('./cors')
    , helmet = require('./helmet')
    , mongoose = require('./mongoose')
    , logger = require('./logger')
	, criticalError = require('../helpers/criticalError')

module.exports = async (app) => {
    app.use(helmet(app))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(logger)
    app.use(cors(app))
    await mongoose().catch(e=>criticalError('Cannot connect to mongoDB'))
}