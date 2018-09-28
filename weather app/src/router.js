const express = require('express')
    , fs = require('fs')
    , path = require('path')

    , send = require('./send')
    , isLogged = require('./isLogged')
    , redirect = require('./redirect')

    , router = express.Router()

module.exports = (passport)=>{
    fs.readdirSync(path.join(__dirname, 'routes'))
    .map(v=>Object({
        path: `/${path.parse(v).name}`,
        router: require(path.join(__dirname, 'routes', v))
    }))
    .map(v=>router.use(v.path, v.router(passport)))
    router.get('/', (req, res)=>{
        if (isLogged(req)){
            return redirect(req, res, '/app');
        }
        redirect(req, res, '/signIn');
    });
    return router;
}
