const router = require('express').Router()
    , fs = require('fs')
    , path = require('path')

    , redirect = require('../helpers/redirect')
    , { log } = require('../helpers/log')

    , URL404 = 'https://worldwideinterweb.com/wp-content/uploads/2012/04/funniest-404-error-messages.jpg'

module.exports = (app) => {

    router.get('/', (req, res)=>res.render('index.ejs'))

    fs.readdirSync(__dirname)
        .filter(file=>file !== "index.js")
        .map(file=>{
            const f_path = path.join(__dirname, file)
            log(`generated route for '${`/${path.parse(file).name}`}' - '${f_path}'`)
            router.use(`/${path.parse(file).name}`, 
            require(f_path)(app))
        })

    router.use((req, res, next) => res.redirect(URL404))
    
    router.use((err, req, res, next) => {
        res.status(500).send(process.env.ENV === 'dev' 
        ? err.message 
        : undefined)
        throw err
    })

    app.use(router)
}