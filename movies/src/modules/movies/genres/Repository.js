const BaseRepository = require("../../../common/BaseRepository"),
    config = require("../../../config"),
    Schema = require("./Schema");

module.exports = class GenresRepository extends BaseRepository {
    constructor() {
        super(config.GENRES_DATABASE_NAME, Schema);
    }
    getId(name) {
        return this.createOrUpdate("name", name, { name });
    }
};
