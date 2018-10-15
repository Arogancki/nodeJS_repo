const helmet = require('helmet')

module.exports = (app) => (req, res, next) => {
        app.use(helmet())
        app.disable(`x-powered-by`)
        app.set(`trust proxy`, 1)
        next()
}