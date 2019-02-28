const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const email = Joi.string().email({ minDomainAtoms: 2 })

const password = Joi.string().regex(/^.*(?=.*\d)((?=.*[a-zA-Z])).{4,40}$/mg)
    .error(new Error("Password has to contain at least one number and one letter and from 4 to 40 characters"))

.options({language:{string:{regex: 'dupa'}}})

exports.email = email.required()

exports.emailNotRequired = email

exports.password = password.required()

exports.passwordNotRequired = password

exports.password_confirmation = Joi.any().valid(Joi.ref('password')).required()
    .error(new Error("Passwords do not match"))

exports.string = Joi.string().required()

exports.id = Joi.objectId().required()