const router = require('express').Router()
    , Joi = require('joi')
    , path = require('path')
    , fs = require('fs')

    , redirect = require('../helpers/redirect')

    , postSchema = {
        text: Joi.string().alphanum().min(3).max(100).required(),
    }

module.exports = (app)=>{
    router.use(async (req, res, next)=>{
        if (!req.isAuthenticated())
            return redirect(req, res, 'sign/in')
        next()
    })
    
    router.get('/', async function (req, res) {
         res.json(req.user.data)
    })
    
    router.post('/', async function (req, res) {
        const validation = Joi.validate(req.body, postSchema)
        if (validation.error){
            res.statusMessage = validation.error.details[0].message
            return res.status(422).end()
        }

        let user = req.user
        user.data = [ req.body.text, ...user.data]
        try{
            await user.save()
            return res.json(user.data)
        }
        catch(err){
            res.statusMessage = err.message
            return res.status(503).end()
        }
    })

    return router
}