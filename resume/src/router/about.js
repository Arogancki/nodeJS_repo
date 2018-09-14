const router = require('express').Router()
    , moment = require('moment')

    , render = require('../helpers/render')

module.exports = (app) => {
    router.get('/', async (req, res)=>render(req, res, 'main/about', {
        age: moment().diff('1995-06-05', 'years')
    }))

    return router
}