const router = require('express').Router()
    , fs = require('fs')
    , path = require('path')

    , render = require('../helpers/render')
    , sendEmail = require('../helpers/sendEmail')
    , handleError = require('../helpers/handleError')

module.exports = (app) => {
    router.get('/', (req, res) => res.redirect('/about'))

    fs.readdirSync(__dirname)
        .filter(file=>file !== "index.js")
        .map(file=>router.use(`/${path.parse(file).name}`, 
            require(path.join(__dirname, file))(app)))
           
    router.get('/404', (req, res) => render(req, res, 'errors/404'))
    router.get('/429', (req, res) => render(req, res, 'errors/429', {remainingTime: 10}))
    router.get('/500', (req, res) => render(req, res, 'errors/500'))

    router.use((req, res, next) => render(req, res.status(404), 'errors/404'))
    
    router.use((err, req, res, next) => handleError(err, req, res))

    app.use(router)
}