const router = require('express').Router()
    , Joi = require('joi')
    
    , bcrypt = require('../helpers/bcrypt')
    , models = require('../models')
    , handleError = require('../helpers/handleError')
    , signUpSchema = {
        email: Joi.string().email().min(3).max(50).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        password2: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'passwords do not match' } } })
    }

module.exports = (app) => {

    router.post('/', (req, res, next)=>{
        const validation = Joi.validate(req.body, signUpSchema)
        if (validation.error){
            return res.status(422).json(validation.error.details[0])
        }
        return bcrypt.encode(req.body.password)
        .then(hash=>models.user.create(req.body.email, hash))
        .then(_=>res.end())
        .catch(err=>err.message 
            ? res.status(402).json({message: err.message}) 
            : handleError(err, req, res)
        )
    })

    return router
}