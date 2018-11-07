const router = require('express').Router()
    , assert = require('assert')
    , twilioClient = require('twilio')(
        process.env.twilioAccountSid, process.env.twilioAuthToken
    )
    , addToObject = require('../helpers/addToObject')
    , { log } = require('../helpers/log')
    , requiredProtocols = [`stun`, `turn`]

module.exports = (app) => {

    router.get('/', async (req, res) => {
            // authentication consider as already done
            if (!((req.session||{}).twilio||{}).iceServers){
                
                try {
                    const token = await twilioClient.tokens.create()
                        , iceServers = {}
                    
                    token.iceServers
                    .map(iceServers=>iceServers.url)
                    .forEach(iceServer=>{
                        const protocol = (iceServer.split(':'))[0]
                        if (iceServers.hasOwnProperty(protocol)){
                            iceServers[protocol].push(iceServer)
                        }
                        else {
                            iceServers[protocol] = [iceServer]
                        }
                    })

                    requiredProtocols.forEach(protocol=>assert(
                        iceServers.hasOwnProperty(protocol), 
                        `Got token with missing ${protocol} server url`
                    ))

                    addToObject(req, {
                        dateCreated: token.dateCreated,
                        dateUpdated: token.dateUpdated,
                        credential: {
                            username: token.username,
                            password: token.password,
                            ttl: token.ttl
                        },
                        iceServers
                    }, 'session', 'twilio', 'iceServers')
                }
                catch(e){
                    log(`ERROR: ${e}`)
                    return res.status(500).end()
                }
            }
            return res.json(req.session.twilio.iceServers)
    })
    
    return router
}