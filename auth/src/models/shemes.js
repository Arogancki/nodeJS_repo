const Joi = require('joi')

const email = Joi.string().email({ minDomainAtoms: 2 })

const password = Joi.string().regex(/^[a-zA-Z0-9]{4,40}$/)

exports.email = email.required()

exports.emailNotRequired = email

exports.password = password.required() 

exports.passwordNotRequired = password

exports.password_confirmation = Joi.any().valid(Joi.ref('password')).required()
    .options({language:{any:{allowOnly: 'passwords do not match'}}})

exports.id = Joi.string().required()