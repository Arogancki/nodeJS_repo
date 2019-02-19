const mongoose = require('mongoose')
    , config = require('../config')
    , CollectionManager = require('./CollectionManager')
    , comments = new mongoose.Schema({
        movieId: {
            type: String,
            ref: config.MOVIES_DATABASE_NAME
        },
        comments: [{
            type: String,
            default: []
        }]
    }, { versionKey: false })

class CommentsManager extends CollectionManager{
    async add(movieId, comment){
        return super.createOrUpdate('movieId', movieId, {$push: {comments: comment}})
    }
    async getByMovieId(movieId){
        const comments = await super.get('movieId', movieId)
        if (!comments){
            return {
                movieId, comments: []
            }
        }
        return comments.filtered
    }
    async getAll(){
        const movies = await super.getAll()
        return movies.filtered
    }
}

module.exports = new CommentsManager(mongoose.model(config.COMMENTS_DATABASE_NAME, comments))