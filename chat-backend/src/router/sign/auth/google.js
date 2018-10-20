const router = require('express').Router()

module.exports = (app) => {
    router.get('/', app.passport.authenticate('google'), {
        scope: ['profile']
    })
    router.get('/cb', app.passport.authenticate('google'), (req, res)=>{
        res.send(req.user)
    })
    return router
}