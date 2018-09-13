const router = require('express').Router()

    , technologies = require('../assets/technologies')
    , render = require('../helpers/render')

module.exports = (app) => {
    router.get('/', async (req, res)=>render(req, res, 'main/technologies', {technologies}))

    return router
}