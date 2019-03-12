const log = require('./helpers/log')
    , joi = require('joi')

module.exports = {
    addService: {
        addPort: {
            calculate: function(args) {
                const validation = joi.validate(args, joi.object().keys({
                    a: joi.number().precision(8).min(-10000.0).max(10000.0).required(),
                    b: joi.number().precision(8).min(-10000.0).max(10000.0).required()
                }))
                if (validation.error){
                    throw validation.error.details[0].message
                }
                log.trace("calculate runing with", args)
                const response = parseFloat(args.a) + parseFloat(args.b)
                log.trace("calculate finished with", response)
                return {response}
            }
        }
    }
};