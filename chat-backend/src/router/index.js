const router = require('express').Router()
    , fs = require('fs')
    , path = require('path')

    , redirect = require('../helpers/redirect')
    , handleError = require('../helpers/handleError')

module.exports = (app) => {

    router.all('/', (req, res, next)=>{
        if (req.isAuthenticated())
            return redirect(req, res, '/')
        return redirect(req, res, '/sign/in')
    })

    fs.readdirSync(__dirname)
        .filter(file=>file !== "index.js")
        .map(file=>router.use(`/${path.parse(file).name}`, 
            require(path.join(__dirname, file))(app)))

    router.use((req, res, next) => res.status(404).send('Not found'))
    
    router.use((err, req, res, next) => handleError(err, req, res))

    app.use(router)
}