const router = require('express').Router()

    , send = require('../send')
    , html = require('../client/html')
    , signIn = require('../client/signIn')

module.exports=(passport)=>{
    router.post('/', (req, res)=>{
        
    })
    router.get('/', function (req, res) {
        send(req, res, 200, html(signIn(req.flash('signInMessage')||"")));
    })
    return router;
};