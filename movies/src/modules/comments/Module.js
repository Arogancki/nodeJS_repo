const CommentsRepository = require("./Repository"),
    CommentsRouter = require("./Router"),
    CommentsService = require("./Service");

module.exports = class CommentsModule {
    constructor(movieService) {
        const repository = new CommentsRepository();

        this.service = new CommentsService({
            repository,
            movieService,
        });
        this.router = new CommentsRouter(this.service);
    }
};
