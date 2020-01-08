const NotFoundError = require("../../common/NotFoundError");
const CommentsFacade = require("./Facade");

module.exports = class CommentsService {
    constructor(options) {
        Object.assign(this, options);
    }

    async _getMovie(query) {
        const [movie] = await this.movieService.get(query);
        if (!movie) {
            throw new NotFoundError();
        }
        return movie;
    }

    async get(query) {
        let comments = [];
        if (query.id || query.title) {
            const { id } = await this._getMovie(query);
            comments = [await this.repository.getByMovieId(id)];
        } else {
            comments = await this.repository.getAll();
        }
        return comments.filter(Boolean).map(comment => new CommentsFacade(comment));
    }

    async post(body) {
        const { id } = await this._getMovie(body);
        await this.repository.add(id, body.comment);
        return { movieId: id };
    }
};
