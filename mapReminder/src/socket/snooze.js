const models = require('../models')
    , Joi = require('joi')

    , snoozeSchema = {
        id: Joi.required(),
        time: Joi.string().min(5000).required()
    }

module.exports = async (data, socket) => {
    const validation = Joi.validate(data, snoozeSchema)
    if (validation.error){
        return Promise.reject(validation.error.details[0])
    }

    return models.location.snooze(data.id, data.time, socket.client.user.email, (err, loc)=>{
        !err
        ? socket.emit('unsnooze-done', loc)
        : socket.emit('err', {event: "unsnooze", message: err.message})
    })
}