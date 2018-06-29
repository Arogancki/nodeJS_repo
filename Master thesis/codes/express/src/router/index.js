const router = require('express').Router()
    , fs = require('fs')
    , path = require('path')

    , redirect = require('../helpers/redirect')

module.exports = (app) => {

    router.all('/', (req, res, next)=>{
        redirect(req, res, '/app')
    })

    fs.readdirSync(__dirname)
        .filter(file=>file !== "index.js")
        .map(file=>router.use(`/${path.parse(file).name}`, 
            require(path.join(__dirname, file))(app)))

    router.use((req, res, next) => res.status(404).send('Not found'))
    
    router.use((err, req, res, next) => {
        res.status(500).send(process.env.ENV === 'dev' 
        ? err.message 
        : undefined)
        throw err
    })

    app.use(router)
}