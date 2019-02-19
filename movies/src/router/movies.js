const createRouter = require('../helpers/createRouter')
    , moviesManager = require('../models/moviesManager')
    , httpStatuses = require('http-status-codes')
    , validJoiScheme = require('../validators/validJoiScheme')
    , schemes = require('../validators/shemes')
    , moviesProvider = require('../helpers/moviesProvider')
    , errorHandler = require('../helpers/errorHandler')

module.exports = app => {
    return createRouter([{
        method: 'get',
        validation: validJoiScheme(schemes.mightHaveTitleOrId, 'query'),
        handler: async (req, res)=>{
            try {
                let movie = null
                if (req.query.id) {
                    movie = await moviesManager.getById(req.query.id)
                }
                else if (req.query.title) {
                    movie = await moviesManager.getByTitle(req.query.title)
                }
                else {
                    movie = await moviesManager.getAll()
                }
                if (!movie) {
                    throw {status: httpStatuses.NOT_FOUND}
                }
                res.json(movie)
                return req.logger(`response 200`)
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'post',
        validation: validJoiScheme(schemes.hasTitleOrId, 'body'),
        handler: async (req, res)=>{
            try {
                let movie = null
                if (req.body.title) {
                    movie = await moviesProvider.getByTitle(req.body.title)
                }
                else /*if (req.body.id)*/ {
                    movie = await moviesProvider.getById(req.body.id)
                }
                if (movie.Error){
                    res.status(httpStatuses.NOT_FOUND).json({error: movie.Error})
                    return req.logger(`response: 404 (${movie.Error})`)
                }
                const id = await moviesManager.createOrUpdate(movie)
                res.json({id})
                return req.logger(`response: 200`)
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }])
}