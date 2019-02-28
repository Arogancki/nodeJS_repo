const pm = require('../models/placesManager')
    , statuses = require('../assets/reminderStatuses')

module.exports = async function validPlaceStatus(id, status){
    const place = await pm.get(id)
    if (place.status === status 
        || place.status === statuses.DONE 
        || place.status === statuses.EXPIRED){
        return `\"status\" is invalid`
    }
}