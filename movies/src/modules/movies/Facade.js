const MovieRatings = require("./model/MovieRatings");

module.exports = class MovieFacade {
    constructor(movie) {
        const { _id, ...props } = movie;
        Object.assign(this, {
            ...props,
            id: String(_id),
            ratings: props.ratings.map(({ _id, ...props }) => props),
            actors: props.actors.map(({ _id, ...props }) => props),
            writers: props.writers.map(({ _id, ...props }) => props),
            genres: props.genres.map(({ _id, ...props }) => props),
            directors: props.directors.map(({ _id, ...props }) => props),
        });
    }
};
