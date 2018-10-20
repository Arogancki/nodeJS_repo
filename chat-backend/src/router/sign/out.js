const router = require('express').Router()
    , redirect = require('../../helpers/redirect')

module.exports = (app) => {
    router.get('/', function(req, res) {
        req.logout()
        return redirect(req, res, '/')
    })
    return router
}