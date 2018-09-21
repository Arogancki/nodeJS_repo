const router = require('express').Router()
    , shuffle = require('shuffle-array')

    , tags = require('../assets/tags')
    , projects = require('../assets/projects')
    , render = require('../helpers/render')

module.exports = (app) => {
    router.get('/', async (req, res)=>render(req, res, 'main/projects', {
        projects,
        tags,
        shuffle: (arr)=>shuffle(arr,{copy:true})
    }))

    return router
}