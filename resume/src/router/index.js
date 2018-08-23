const router = require('express').Router()
    , fs = require('fs')
    , path = require('path')

    , render = require('../helpers/render')

module.exports = (app) => {
    app.get('/', (req, res) =>  res.redirect('/about'))
    fs.readdirSync(__dirname)
        .filter(file=>file !== "index.js")
        .map(file=>router.use(`/${path.parse(file).name}`, 
            require(path.join(__dirname, file))(app)))
    app.get('/404', (req, res) => render(req, res.status(200), 'errors/404'))
    app.get('/429', (req, res) => render(req, res.status(200), 'errors/429', {remainingTime: 10}))
    app.get('/500', (req, res) => render(req, res.status(200), 'errors/500'))

    router.use((req, res, next) => render(req, res.status(404), 'errors/404'))
    
    router.use((err, req, res, next) => {
        console.error(err.message)
        render(req, res.status(500), 'errors/500')
        if (process.env.ENV === 'PRODUCTION'){
            // TODO send mail with error
        }
        else
            res.send(err)
    })

    app.use(router)
}