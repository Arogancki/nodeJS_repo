const router = require('express').Router()
    , Joi = require('joi')

    , redirect = require('../../helpers/redirect')

    , signInSchema = {
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }

module.exports=(app)=>{
    router.get('/', function (req, res) {
        res.render('index.ejs', {
            body: "sign",
            isNew: false,
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
            message: req.flash('signInMessage').join('\n')
        })
    })

    router.post('/', (req, res, next)=>{
        const validation = Joi.validate(req.body, signInSchema)
        if (validation.error){
            req.flash('signInMessage', validation.error.details[0].message)
            return redirect(req, res, '/sign/in');
        }
        return app.passport.authenticate('signInLocal', {
            successRedirect : '/',
            failureRedirect : '/sign/in',
            failureFlash : true
        })(req, res, next)
    })

    return router
}