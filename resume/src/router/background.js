const router = require('express').Router()
    , path = require('path')

module.exports = (app) => {
    
    router.get('/',  (req, res) => {
        console.log('hej')
    })

    router.get('/.jpg', (req, res) => 
            res.sendFile(path.resolve(app.public, "images/background/", ( ( new Date().getDay() % 4 ) + 1 ) + ".jpg")))
    
    router.get('/-min.jpg', (req, res) => 
        res.sendFile(path.resolve(app.public, "images/background/", ( ( new Date().getDay() % 4 ) + 1 ) + "-min.jpg")))
    
    return router
}