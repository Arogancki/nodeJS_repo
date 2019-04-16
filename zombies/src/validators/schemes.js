const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension);

const name = Joi.string().min(2).max(12)

const id = Joi.string().regex(/^[a-f\d]{24}$/i)

const itemId = Joi.number().min(0).max(1000)

const zombieItemId = Joi.string().regex(/^\d{1,14}-\d{1,12}$/)

exports.hasZombieId = Joi.object().keys({id: id.required()})

exports.hasName = Joi.object().keys({name: name.required()})

exports.hasItemId = Joi.object().keys({id: itemId.required()})

exports.hasZombieItemId = Joi.object().keys({id: zombieItemId.required()})

exports.apiItems = Joi.object().keys({
    timestamp: Joi.number().min(0).max(999999999999999).required(),
    items: Joi.array().items(Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().min(2).max(100).required(),
        price: Joi.number().required()
    }).required()).required()
})

exports.apiCurrency = Joi.array().length(1).items(Joi.object().keys({
    effectiveDate: Joi.date().format('YYYY-MM-DD').required(),
    tradingDate: Joi.date().format('YYYY-MM-DD'),
    table: Joi.string(),
    no: Joi.string(),
    rates: Joi.array().items(Joi.object().keys({
        ask: Joi.number().required(),
        bid: Joi.number().required(),
        code: Joi.string().required(),
        currency: Joi.string()
    }))
}))