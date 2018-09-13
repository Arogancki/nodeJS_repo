const router = require('express').Router()
    , Joi = require('joi')

    , sendEmail = require('../helpers/sendEmail')
    , handleError = require('../helpers/handleError')
    , render = require('../helpers/render')

    , emailSchema = {
        contact: Joi.string().min(2).max(100).required(),
        subject: Joi.string().min(2).max(200).required(),
        text: Joi.string().min(2).max(5000).required(),
    }

module.exports = (app) => {
    router.get('/', async (req, res)=>render(req, res, 'main/contact'))

    router.post('/', async (req, res)=>{
        const validation = Joi.validate(req.body, emailSchema)
        if (validation.error){
            return res.status(422).json(validation.error.details)
        }

        const { subject, text, contact } = req.body
        return sendEmail(subject, text, contact)
        .then(info=>res.json(info))
        .catch(err=>handleError(err, req, res))
    })

    return router
}

