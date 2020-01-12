import Joi from "joi";
import boom from "boom";

export default async function(dto: Object, schema: Joi.SchemaLike) {
    try {
        await Joi.validate(dto, schema);
    } catch (err) {
        const { output } = boom.badRequest(err.message);
        throw output;
    }
}
