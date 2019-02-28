const Joi = require('joi')

module.exports = function validJoiScheme(scheme, validationElement){
    return req=>{
        const validation = Joi.validate(req[validationElement], scheme)
        if (validation.error){
            return validation.error.details
            ? validation.error.details.map(d=>d.message)
            : [validation.error.message]
        }
    }
}