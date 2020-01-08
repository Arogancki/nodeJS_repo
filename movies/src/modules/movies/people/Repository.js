const BaseRepository = require("../../../common/BaseRepository"),
    config = require("../../../config"),
    Schema = require("./Schema");

module.exports = class PeopleRepository extends BaseRepository {
    constructor() {
        super(config.PEOPLE_DATABASE_NAME, Schema);
    }
    getId(name) {
        return this.createOrUpdate("name", name, { name });
    }
};
