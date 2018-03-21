const router = require('express').Router()
    , Joi = require('joi')

    , send = require('../send')
    , html = require('../client/html')
    , signIn = require('../client/signIn')
    , redirect= require('../redirect')
    , isLogged = require('../isLogged')

    , signInSchema = {
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    };

module.exports=(passport)=>{
    router.post('/', (req, res, next)=>{
        if (isLogged(req)){
            redirect(req, res, '/app');
            return
        }
        const validation = Joi.validate(req.body, signInSchema);
        if (validation.error){
            req.flash('signInMessage', validation.error.details[0].message);
            redirect(req, res, '/signIn');
            return
        }
        passport.authenticate('signIn', {
            successRedirect : '/app',
            failureRedirect : '/signIn',
            failureFlash : true
        })(req, res, next)
    })
    router.get('/', function (req, res) {
        send(req, res, 200, html(signIn(req.flash('signInMessage')||"")));
    })
    return router;
};