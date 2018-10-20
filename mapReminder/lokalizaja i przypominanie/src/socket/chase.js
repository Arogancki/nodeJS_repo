const models = require('../models')
    , Joi = require('joi')

    , { getLocations } = require('./helpers')

    , chaseSchema = {
        latitude: Joi.number().min(-86).max(86).required(),
        longitude: Joi.number().min(-180).max(180).required()
    }

const alert = (socket, location)=>{
    console.log('NEAR emited', location)
    socket.emit('near', location)
    return location
}

const getDistance = (x1, y1, x2, y2) => 
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

module.exports = async (data, socket) =>{
    const validation = Joi.validate(data || {}, chaseSchema)
    if (validation.error){
        return Promise.reject(validation.error.details[0])
    }

    return (await getLocations(socket.client.user)).locations
    .filter(v=>v.active && 
        v.tolerance >= getDistance(data.latitude,  data.longitude, 
            v.latitude, v.longitude)
    ).map(v=>{
        alert(socket, v)
        return v
    })
}