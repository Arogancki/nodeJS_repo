const router = require('express').Router()

    , send = require('../send')
    , html = require('../client/html')
    , signUp = require('../client/signUp')

module.exports=(passport)=>{    
    router.post('/', passport.authenticate('signUp', {
        successRedirect : '/app',
        failureRedirect : '/signUp',
        failureFlash : true
    }));
    router.get('/', function (req, res) {
        send(req, res, 200, html(signUp(req.flash('signUpMessage')||"")));
    })
    return router;
};