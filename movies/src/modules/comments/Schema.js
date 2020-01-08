const mongoose = require("mongoose"),
    config = require("../../config");

module.exports = new mongoose.Schema(
    {
        movieId: {
            type: String,
            ref: config.MOVIES_DATABASE_NAME,
        },
        comments: [
            {
                type: String,
                default: [],
            },
        ],
    },
    { versionKey: false },
);
