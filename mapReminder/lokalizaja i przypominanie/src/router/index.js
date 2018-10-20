const router = require('express').Router()
    , fs = require('fs')
    , path = require('path')
    , render = require('../helpers/render')

    , handleError = require('../helpers/handleError')

module.exports = (app) => {
    router.get('/', (req, res) => render(req, res, 'main/index'))

    fs.readdirSync(__dirname)
        .filter(file=>file !== "index.js")
        .map(file=>router.use(`/${path.parse(file).name}`, 
            require(path.join(__dirname, file))(app)))

    router.use((req, res, next) => render(req, res.status(404), 'errors/404'))

    router.use((err, req, res, next) => handleError(err, req, res))

    app.use(router)
}