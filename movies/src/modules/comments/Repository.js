const config = require("../../config"),
    Schema = require("./Schema"),
    BaseRepository = require("../../common/BaseRepository");

module.exports = class CommentsRepository extends BaseRepository {
    constructor() {
        super(config.COMMENTS_DATABASE_NAME, Schema);
    }
    async add(movieId, comment) {
        return super.createOrUpdate("movieId", movieId, { $push: { comments: comment } });
    }
    getByMovieId(movieId) {
        return this._model.findOne({ movieId }).lean();
    }
    getAll() {
        return this._model.find({}).lean();
    }
};
