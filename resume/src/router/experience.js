const router = require('express').Router()
    , render = require('../helpers/render')

module.exports = (app) => {
    router.get('/', async (req, res)=>render(req, res, 'main/experience'))

    return router
}