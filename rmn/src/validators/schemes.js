const Joi = require('joi')
    , statuses = require('../assets/reminderStatuses')
Joi.objectId = require('joi-objectid')(Joi)

const placeName = Joi.string().min(3).max(50)
    , placeDescription = Joi.string().min(0).max(500)
    , latitude = Joi.number().required().min(-86).max(86)
    , longitude = Joi.number().min(-180).max(180)
    , tolerance = Joi.number().min(0.001).max(10)
    , status = Joi.string().uppercase().valid(Object.values(statuses))
    , id = Joi.objectId()
    , minutes = Joi.number().min(1).max((60*24*365*2.1))

exports.placesPut = Joi.object().keys({
    name: placeName.required(),
    description: placeDescription.default(''),
    latitude: latitude.required(),
    longitude: longitude.required(),
    tolerance: tolerance.required()
}).required()

exports.placesIdPost = Joi.object().keys({
    name: placeName,
    description: placeDescription,
    latitude: latitude,
    longitude: longitude,
    tolerance: tolerance,
}).required()

exports.placesIdSet_statusPost = Joi.object().keys({
    status: status.required(),
    minutes: minutes.when('status', {
        is: statuses.SLEPT,
        then: Joi.required()
    })
})

exports.id = id.required()
exports.minutes = minutes.required()