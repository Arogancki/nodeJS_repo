const Joi = require("joi");

const title = Joi.string()
    .min(2)
    .max(100);

const id = Joi.string()
    .min(2)
    .max(12);

const titleWithId = Joi.object().keys({
    title,
    id,
});

exports.hasTitleOrId = titleWithId.xor("title", "id");

exports.mightHaveTitleOrId = titleWithId;

exports.hasComment = Joi.object().keys({
    comment: Joi.string()
        .min(5)
        .max(100)
        .required(),
});
