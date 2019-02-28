const httpStatuses = require('http-status-codes')
    , statuses = require('../assets/reminderStatuses')
    , pm = require('../models/placesManager')

module.exports = async function webCallback(req, res){
    const place = await pm.get(req.params.id)
    if (!place || !(
        req.body.status === statuses.ACTIVE
        && place.changeStatusToActiveHandler
        && place.changeStatusToActiveHandler.token === req.query.token
        && place.changeStatusToActiveHandler.id.toString() === req.query.id 
        ) && !(
        req.body.status === statuses.EXPIRED
        && place.changeStatusToExpiredHandler 
        && place.changeStatusToExpiredHandler.token === req.query.token
        && place.changeStatusToExpiredHandler.id.toString() === req.query.id
        )
    ){
        return httpStatuses.NOT_FOUND
    }
}