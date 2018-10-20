const router = require('express').Router()
    , fs = require('fs')
    , path = require('path')
    , timestamp = require('time-stamp')

    , handleError = require('../helpers/handleError')

module.exports = (app) => {
    fs.readdirSync(__dirname)
    .filter(file=>file !== "index.js")
    .map(file=>
        router.use(`/${path.parse(file).name}`, require(path.join(__dirname, file))(app))
    )

    router.use((req, res, next) =>{
        return res.json(
            [{
                "clientId": req.session.id,
                "timestamp": timestamp.utc('YYYY-MM-DDT-HH:mm:ss.ms').slice(0, -1),
                "advice":{
                    "interval":0,
                    "reconnect":"retry"
                },
                "channel":"\/meta\/handshake",
                "ext":{
                    "fm.timeout":25000,
                    "fm.sessionId":"f48b80fe-88c8-4ebb-934a-e595c853ac3d"
                },
                "id":"1",
                "successful":true,
                "supportedConnectionTypes":[
                    "long-polling"
                ],
                "version":"1.0"
            }]
        )
    })
           
    router.use((req, res, next) => res.status(404).end())
    router.use((err, req, res, next) => handleError(err, req, res))

    app.use(router)
}