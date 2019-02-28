const httpStatuses = require('http-status-codes')
    , pm = require('../models/placesManager')

module.exports = async function ownsPlace(req, res){
    const place = await pm.get(req.params.id)
    if (!place || place.userId.toString() !== req.session.user.userId){
        return httpStatuses.NOT_FOUND
    }
}