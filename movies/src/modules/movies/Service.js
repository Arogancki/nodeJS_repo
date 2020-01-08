const MovieFacade = require("./Facade");

module.exports = class MoviesService {
    constructor(options) {
        Object.assign(this, options);
    }

    async get(query) {
        const { id, title } = query || {};
        const movies = id
            ? [await this.repository.getById(id)]
            : title
            ? [await this.repository.getByTitle(title)]
            : await this.repository.getAll();
        return movies.filter(Boolean).map(movie => new MovieFacade(movie));
    }

    async post(query) {
        const movie = await this.provider.get(query);

        movie.genres = await Promise.all(movie.genres.map(genre => this.genresService.getId(genre)));
        movie.actors = await Promise.all(movie.actors.map(actor => this.peopleService.getId(actor)));
        movie.directors = await Promise.all(movie.directors.map(director => this.peopleService.getId(director)));
        movie.writers = await Promise.all(movie.writers.map(writer => this.peopleService.getId(writer)));

        const id = await this.repository.createOrUpdate(movie);
        return { id };
    }
};
