const path = require("path"),
    validators = require("./validators"),
    parsers = require("./parsers");

exports.required = ["NODE_ENV", "PORT", "MONGODB_URI", "API_KEY"];

exports.optional = {
    LOG_LEVEL: "trace", // no, info, debug, trace
    LOG_BODY: true,
    LOG_FILE: path.join(process.cwd(), "logs.html"),
    LOG_TEMPLATE: path.join(process.cwd(), "src", "assets", "log-template.html"),
    MOVIES_DATABASE_NAME: "movies_collection",
    PEOPLE_DATABASE_NAME: "people_collection",
    GENRES_DATABASE_NAME: "genres_collection",
    COMMENTS_DATABASE_NAME: "comments_collection",
    PRINT_CONFIG: true, // level debug
};

exports.parsers = {
    NODE_ENV: parsers.toLower,
    LOG_LEVEL: parsers.toLower,
    LOG_BODY: parsers.toBooleanOrString,
    PRINT_CONFIG: parsers.toBooleanOrString,
};

exports.validators = {
    LOG_BODY: validators.isBolean,
    LOG_TEMPLATE: validators.fileExistsIfTrue,
    LOG_FILE: validators.isFilePathValidIfTrue,
    PRINT_CONFIG: validators.isBolean,
};
