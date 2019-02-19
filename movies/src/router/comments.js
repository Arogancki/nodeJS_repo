const createRouter = require('../helpers/createRouter')
    , commentsManager = require('../models/commentsManager')
    , moviesManager = require('../models/moviesManager')
    , httpStatuses = require('http-status-codes')
    , validJoiScheme = require('../validators/validJoiScheme')
    , schemes = require('../validators/shemes')
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
                    const comments = await commentsManager.getAll()
                    res.json(comments)
                    return req.logger(`response: 200`)
                }
                if (!movie) {
                    throw {status: httpStatuses.NOT_FOUND}
                }
                const comments = await commentsManager.getByMovieId(movie.id)
                res.json(comments)
                return req.logger(`response: 200`)
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'post',
        validation: validJoiScheme(schemes.hasTitleOrId.concat(schemes.hasComment), 'body'),
        handler: async (req, res)=>{
            try {
                let movie = null
                if (req.body.title) {
                    movie = await moviesManager.getByTitle(req.body.title)
                }
                else /*if (req.body.id)*/ {
                    movie = await moviesManager.getById(req.body.id)
                }
                if (!movie) {
                    throw {status: httpStatuses.NOT_FOUND}
                }
                await commentsManager.add(movie.id, req.body.comment)
                res.json({movieId: movie.id})
                return req.logger(`response: 200`)
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }])
}