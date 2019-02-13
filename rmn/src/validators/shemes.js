const Joi = require('joi')
    , config = require('../config')

const login = Joi.string().alphanum().min(3).max(30)

const password = Joi.string().min(4).max(40).alphanum()

exports.login = login.required()

exports.loginNotRequired = login

exports.password = password.required() 

exports.passwordNotRequired = password

exports.password_confirmation = Joi.any().valid(Joi.ref('password')).required()
    .options({language:{any:{allowOnly: 'passwords do not match'}}})

exports.sec = Joi.number().positive().integer().max(config.MAX_TIMER_SEC).required()