const mongoose = require("mongoose"),
    mongooseUrlType = require("./node_modules/mongoose-type-url"),
    mongooseCurrency = require("./node_modules/mongoose-currency").loadType(mongoose),
    config = require("../../config");

module.exports = new mongoose.Schema(
    {
        _id: String,
        title: {
            type: String,
            required: true,
        },
        year: Number,
        rated: String,
        released: Date,
        runtime: String,
        genres: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: config.GENRES_DATABASE_NAME,
            },
        ],
        directors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: config.PEOPLE_DATABASE_NAME,
            },
        ],
        writers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: config.PEOPLE_DATABASE_NAME,
            },
        ],
        actors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: config.PEOPLE_DATABASE_NAME,
            },
        ],
        plot: String,
        language: String,
        country: String,
        awards: String,
        poster: mongoose.SchemaTypes.Url,
        ratings: [
            {
                source: String,
                value: String,
            },
        ],
        metascore: String,
        imdbRating: String,
        imdbVotes: String,
        type: String,
        DVD: Date,
        boxOffice: mongoose.Types.Currency,
        production: String,
        website: mongoose.SchemaTypes.Url,
    },
    { versionKey: false, virtuals: true },
);
