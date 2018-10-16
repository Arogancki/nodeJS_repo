const models = require('../models')

exports.getLocations = async user => {
    user.lastChase = user.lastChase 
    ? user.lastChase + ((process.env.CACHE_USER_TIME || 10) * 1000)
    : 0
    if (process.env.CACHE_USER=='true' && (1 * new Date() > user.lastChase)){
        user.cachedLocations = await models.user.getLocations(user.email)
        user.lastChase = 1 * new Date() 
    }
    return user.cachedLocations
}