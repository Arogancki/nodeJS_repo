const bodyParser = require('body-parser')
    , helmet = require('./helmet')
    , logger = require('./logger')

module.exports = async (app) => {
    app.use(helmet(app))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(logger)
}