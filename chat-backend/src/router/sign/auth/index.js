const router = require('express').Router()
    , fs = require('fs')
    , path = require('path')

module.exports = (app) => {
    
    fs.readdirSync(__dirname)
    .filter(file=>file !== "index.js")
    .map(file=>router.use(`/${path.parse(file).name}`, 
        require(path.join(__dirname, file))(app)))

    return router
}