const MoviesProvider = require("./Provider"),
    MoviesRepository = require("./Repository"),
    GenresModule = require("./genres/Module"),
    PeopleModule = require("./people/Module"),
    MoviesRouter = require("./Router"),
    MoviesService = require("./Service");

module.exports = class MoviesModule {
    constructor() {
        const provider = new MoviesProvider();
        const repository = new MoviesRepository();
        const genresModule = new GenresModule();
        const peopleModule = new PeopleModule();

        this.service = new MoviesService({
            provider,
            repository,
            genresService: genresModule.service,
            peopleService: peopleModule.service,
        });
        this.router = new MoviesRouter(this.service);
    }
};
