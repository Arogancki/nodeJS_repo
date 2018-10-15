const models = require('../models')
    , Joi = require('joi')

    , delHisSchema = {
        id: Joi.required()
    }

module.exports = async (data, socket) => {
    const validation = Joi.validate(data || {}, delHisSchema)
    if (validation.error){
        return Promise.reject(validation.error.details[0])
    }

    return models.user.deleteHistory(data.id, socket.client.user.email)
}