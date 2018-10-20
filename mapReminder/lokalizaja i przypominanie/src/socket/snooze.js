const models = require('../models')
    , Joi = require('joi')

    , snoozeSchema = {
        id: Joi.required(),
        time: Joi.number().min(5000).max((1000*60*60*24)+1).required()
    }

module.exports = async (data, socket) => {
    const validation = Joi.validate(data, snoozeSchema)
    if (validation.error){
        return Promise.reject(validation.error.details[0])
    }

    return models.location.snooze(data.id, data.time, socket.client.user.email, (err, loc)=>{
        !err
        ? socket.myBroadcast('unsnooze-done', {id: loc.id})
        : socket.myBroadcast('err', {event: "unsnooze", message: err.message})
    })
}