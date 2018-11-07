const helmet = require('helmet')
    , nocache = require('nocache')

module.exports = (app) => (req, res, next) => {
        app.use(helmet())
        app.disable(`x-powered-by`)
        app.use(nocache())
        app.set(`trust proxy`, 1)
        next()
}