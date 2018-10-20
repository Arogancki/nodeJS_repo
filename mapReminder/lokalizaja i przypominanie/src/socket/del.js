const models = require('../models')
    , Joi = require('joi')

    , delSchema = {
        id: Joi.required()
    }

module.exports = async (data, socket) => {
    const validation = Joi.validate(data || {}, delSchema)
    if (validation.error){
        return Promise.reject(validation.error.details[0])
    }

    return models.location.deleteLocation(data.id, socket.client.user.email)
}