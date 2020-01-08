const MovieRatings = require("./MovieRatings");

module.exports = class Movie {
    constructor(props) {
        const replaceAndSplit = s => split(String(s || "").replace(/ *\([^)]*\) */g, ""));
        const split = s => String(s || "").split(", ");
        Object.assign(this, {
            title: props.Title,
            year: props.Year,
            rated: props.Rated,
            released: props.Released,
            runtime: props.Runtime,
            genres: split(props.Genre),
            directors: replaceAndSplit(props.Director),
            writers: replaceAndSplit(props.Writer),
            actors: replaceAndSplit(props.Actors),
            plot: props.Plot,
            language: props.Language,
            country: props.Country,
            awards: props.Awards,
            poster: props.Poster,
            ratings: new MovieRatings(props.Ratings || []),
            metascore: props.Metascore,
            imdbRating: props.imdbRating,
            imdbVotes: props.imdbVotes,
            imdbID: props.imdbID,
            type: props.Type,
            DVD: props.DVD,
            boxOffice: props.BoxOffice,
            production: props.Production,
            website: props.Website,
        });
    }
};
