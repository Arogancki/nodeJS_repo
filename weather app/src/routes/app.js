const router = require('express').Router()

    , send = require('../send')
    , html = require('../client/html')

module.exports=(passport)=>{    
    router.get('/', function (req, res) {
        send(req, res, 200, html());
    })
    return router;
};