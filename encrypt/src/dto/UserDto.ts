import Joi from "joi";

export default Joi.object().keys({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(3)
        .max(21)
        .required(),
});
