const router = require('express').Router()
    , Joi = require('joi')

    , send = require('../send')
    , html = require('../client/html')
    , signUp = require('../client/signUp')
    , redirect = require('../redirect')
    , isLogged = require('../isLogged')

    , signUpSchema = {
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        password2: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'password does not match' } } })
    };

module.exports=(passport)=>{
    router.post('/', (req, res, next)=>{
        if (isLogged(req)){
            redirect(req, res, '/app');
            return
        }
        const error = Joi.validate(req.body, signUpSchema);
        if (validation.error){
            req.flash('signUpMessage', error.error.details[0].message);
            redirect(req, res, 'signUp');
        }
        passport.authenticate('signUp', {
            successRedirect : '/app',
            failureRedirect : '/signUp',
            failureFlash : true
        })(req, res, next)
    });
    router.get('/', function (req, res) {
        send(req, res, 200, html(signUp(req.flash('signUpMessage')||"")));
    })
    return router;
};