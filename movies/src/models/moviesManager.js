const mongoose = require('mongoose')
    , mongooseUrlType = require('mongoose-type-url')
    , mongooseCurrency = require('mongoose-currency').loadType(mongoose)
    , CollectionManager = require('./CollectionManager')
    , peopleManager = require('./peopleManager')
    , genresManager = require('./genresManager')
    , escapeStringRegexp = require('escape-string-regexp')
    , config = require('../config')
    , movies = new mongoose.Schema({
        "_id": String,
        "Title": {
            type: String,
            required: true
        },
        "Year": Number,
        "Rated": String,
        "Released": Date,
        "Runtime": String,
        "Genre": [{
            type: mongoose.Schema.Types.ObjectId,
            ref: config.GENRES_DATABASE_NAME
        }],
        "Director": [{
            type: mongoose.Schema.Types.ObjectId,
            ref: config.PEOPLE_DATABASE_NAME
        }],
        "Writer": [{
            type: mongoose.Schema.Types.ObjectId,
            ref: config.PEOPLE_DATABASE_NAME
        }],
        "Actors": [{
            type: mongoose.Schema.Types.ObjectId,
            ref: config.PEOPLE_DATABASE_NAME
        }],
        "Plot": String,
        "Language": String,
        "Country": String,
        "Awards": String,
        "Poster": mongoose.SchemaTypes.Url,
        "Ratings": [{
            "Source": String,
            "Value": String
        }],
        "Metascore": String,
        "imdbRating": String,
        "imdbVotes": String,
        "Type": String,
        "DVD": Date,
        "BoxOffice": mongoose.Types.Currency,
        "Production": String,
        "Website": mongoose.SchemaTypes.Url
    }, { versionKey: false, virtuals: true })

class MoviesManager extends CollectionManager {
    async createOrUpdate(movieProps){
        const GenreIds = await Promise.all(genresManager.parseGenres(movieProps.Genre)
        .map(genre=>genresManager.getOrCreate(genre)))

        const directorIds = await Promise.all(peopleManager.parsePeople(movieProps.Director)
        .map(person=>peopleManager.getOrCreate(person)))

        const writerIds = await Promise.all(peopleManager.parsePeople(movieProps.Writer)
        .map(person=>peopleManager.getOrCreate(person)))

        const actorsIds = await Promise.all(peopleManager.parsePeople(movieProps.Actors)
        .map(person=>peopleManager.getOrCreate(person)))

        return super.createOrUpdate("_id", movieProps.imdbID, {
            ...movieProps, 
            Genre: GenreIds, 
            Director: directorIds, 
            Writer: writerIds, 
            Actors: actorsIds
        })
    }
    async getByTitle(title){
        const movie = await this.get('Title', {
            $regex: new RegExp(`^${escapeStringRegexp(title)}$`, 'i')
        }, ['Actors', 'Genre', 'Director', 'Writer'])
        if (!movie){
            return null
        }
        movie.filtered.id = movie.results._id
        return movie.filtered
    }
    async getById(id){
        const movie = await this.get('_id', id, ['Actors', 'Genre', 'Director', 'Writer'])
        if (!movie){
            return null
        }
        movie.filtered.id = movie.results._id
        return movie.filtered
    }
    async getAll(){
        const movies = await super.getAll(['Actors', 'Genre', 'Director', 'Writer'])
        return movies.filtered.map((movie, index)=>{
            movie.id = movies.results[index]._id
            return movie
        })
    }
}

module.exports = new MoviesManager(mongoose.model(config.MOVIES_DATABASE_NAME, movies))