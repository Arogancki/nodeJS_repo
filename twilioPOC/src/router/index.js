const router = require('express').Router()
    , fs = require('fs')
    , path = require('path')

    , { log } = require('../helpers/log')

module.exports = (app) => {

    fs.readdirSync(__dirname)
        .filter(file=>file !== "index.js")
        .map(file=>{
            const f_path = path.join(__dirname, file)
            log(`generated route for '${`/${path.parse(file).name}`}' - '${f_path}'`)
            router.use(`/${path.parse(file).name}`, 
            require(f_path)(app))
        })

    router.use((req, res, next) => res.status(404).end())
    
    router.use((err, req, res, next) => {
        res.status(500).send(process.env.NODE_ENV==='production'
        ? undefined
        : err.message)
        throw err
    })

    app.use(router)
}