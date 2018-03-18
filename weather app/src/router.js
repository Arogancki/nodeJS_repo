const express = require('express')
    , fs = require('fs')
    , path = require('path')

    , send = require('./send')
    , isLogged = require('./isLogged')

    , router = express.Router()

module.exports = (passport)=>{
    fs.readdirSync(path.join(__dirname, 'routes'))
    .map(v=>Object({
        path: `/${path.parse(v).name}`,
        router: require(path.join(__dirname, 'routes', v))
    }))
    .map(v=>router.use(v.path, v.router(passport)))
    router.get('/', isLogged, (req, res)=>{
        redirect(req, res, '/app');
    });
    return router;
}
