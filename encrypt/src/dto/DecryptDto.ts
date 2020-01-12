import Joi from "joi";

export default Joi.object().keys({
    privateKey: Joi.string().required(),
    message: Joi.string().required(),
});
