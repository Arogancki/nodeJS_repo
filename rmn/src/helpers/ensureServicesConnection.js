const rp = require('request-promise')
    , criticalError = require('../helpers/criticalError')
    , log = require('../helpers/log')

module.exports = async function ensureServicesConnection(servicesAddesses){
    if (Array.isArray(servicesAddesses)){
        return Promise.all(servicesAddesses.map(serviceAddress=>ensureServicesConnection(serviceAddress)))
    }
    try{
        await rp({
            method: 'OPTIONS',
            uri: servicesAddesses,
            resolveWithFullResponse: true
        })
    }
    catch(err){
        return criticalError(`Service ${servicesAddesses} is not available`)
    }
    return log.debug(`Connection with ${servicesAddesses} established`)
}