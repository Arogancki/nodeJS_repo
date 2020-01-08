const mongoose = require("mongoose"),
    config = require("../config");

mongoose.Promise = Promise;
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

module.exports = function ensureConnection() {
    return new Promise((res, rej) => {
        const done = () => res(mongoose);
        if (mongoose.connection.db) {
            return done();
        }
        mongoose.connection.once("open", done);
        mongoose.connection.on("error", rej);
    });
};
