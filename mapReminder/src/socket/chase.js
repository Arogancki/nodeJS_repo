const models = require('../models')
    , Joi = require('joi')

    , { getLocations } = require('./helpers')

    , chaseSchema = {
        latitude: Joi.number().min(-86).max(86).required(),
        longitude: Joi.number().min(-180).max(180).required()
    }

const alert = (socket, location)=>socket.emit('near', location)

const getDistance = (x1, x2, y1, y2) => 
    Math.sqrt(Math.pow(x1 - y1, 2) + Math.pow(x2 - y2, 2))

module.exports = async (data, socket) =>{
    const validation = Joi.validate(data || {}, chaseSchema)
    if (validation.error){
        return Promise.reject(validation.error.details[0])
    }

    (await getLocations(socket.client.user)).locations
    .filter(v=>
        v.active && v.tolerance < getDistance(data.latitude, v.latitude, data.longitude, v.longitude)
    ).forEach(v=>alert(socket, v))
}