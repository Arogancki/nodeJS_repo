const router = require('express').Router()

    , experience = require('../assets/experience')
    , render = require('../helpers/render')

module.exports = (app) => {
    router.get('/', async (req, res)=>render(req, res, 'main/experience', {experience}))

    return router
}