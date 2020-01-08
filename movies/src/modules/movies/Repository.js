const config = require("../../config"),
    Schema = require("./Schema"),
    escapeStringRegexp = require("./node_modules/escape-string-regexp"),
    BaseRepository = require("../../common/BaseRepository");

module.exports = class MoviesRepository extends BaseRepository {
    constructor() {
        super(config.MOVIES_DATABASE_NAME, Schema);
    }
    createOrUpdate(movie) {
        return super.createOrUpdate("_id", movie.imdbID, movie);
    }
    _populate(query) {
        return query
            .populate("actors")
            .populate("genres")
            .populate("directors")
            .populate("writers");
    }
    getByTitle(title) {
        return this._populate(
            this._model.findOne({
                title: {
                    $regex: new RegExp(`^${escapeStringRegexp(title)}$`, "i"),
                },
            }),
        ).lean();
    }
    getById(id) {
        return this._populate(this._model.findOne({ _id: id })).lean();
    }
    getAll() {
        return this._populate(this._model.find({})).lean();
    }
};
