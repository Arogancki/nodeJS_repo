const mongoose = require("mongoose");

module.exports = class BaseRepository {
    constructor(name, schema) {
        this._model = mongoose.model(name, schema);
    }

    async createOrUpdate(key, value, props) {
        const results = await this._model.updateMany({ [key]: value }, props, { upsert: true, new: true });
        const resultDocs = results.upserted || (await this._model.find({ [key]: value }));

        if (!resultDocs) {
            return new Error("No documents");
        }

        return resultDocs.map(doc => String(doc._id));
    }
};
