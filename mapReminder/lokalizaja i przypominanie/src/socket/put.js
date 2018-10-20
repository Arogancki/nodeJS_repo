const models = require('../models')
    , Joi = require('joi')

    , putSchema = {
        name: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(0).max(100).required(),
        latitude: Joi.number().required().min(-86).max(86),
        longitude: Joi.number().min(-180).max(180).required(),
        tolerance: Joi.number().min(0.0001).max(0.5).required()
    }

module.exports = async (data, socket) => {
    const validation = Joi.validate(data || {}, putSchema)
    if (validation.error){
        return Promise.reject(validation.error.details[0])
    }

    return models.user.putLocation(data.name, data.description, data.latitude, 
        data.longitude, data.tolerance, socket.client.user.email)
}