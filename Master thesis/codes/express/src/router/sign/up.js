const router = require('express').Router()
    , Joi = require('joi')

    , redirect = require('../../helpers/redirect')

    , signUpSchema = {
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        password2: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'password does not match' } } })
    }

module.exports = (app) => {
    router.get('/', function (req, res) {
        res.render('index.ejs', {
            body: "sign",
            isNew: true,
            links: [
                {
                    text: 'Sign In',
                    href: '/sign/in'
                },
                {
                    text: 'Sign Up',
                    href: '/sign/up'
                }
            ],
            message: req.flash('signUpMessage').join('\n')
        })
    })
    
    router.post('/', (req, res, next)=>{
        const validation = Joi.validate(req.body, signUpSchema)
        if (validation.error){
            req.flash('signUpMessage', validation.error.details[0].message)
            return redirect(req, res, '/sign/up')
        }
        return app.passport.authenticate('signUpLocal', {
            successRedirect : '/',
            failureRedirect : '/sign/up',
            failureFlash : true
        })(req, res, next)
    })
    return router
}