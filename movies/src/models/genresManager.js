const mongoose = require('mongoose')
    , config = require('../config')
    , CollectionManager = require('./CollectionManager')
    , genres = new mongoose.Schema({
        name: String
    }, { versionKey: false })

class GenresManager extends CollectionManager{
    parseGenres(genresString){
        return typeof genresString === typeof '' 
        ? genresString.split(', ') 
        : []
    }
    getOrCreate(name){
        return super.createOrUpdate('name', name, {name})
    }
}

module.exports = new GenresManager(mongoose.model(config.GENRES_DATABASE_NAME, genres))