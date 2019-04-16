const rp = require('request-promise')
    , config = require('../config')
    , Joi = require('Joi')
    , schemes = require('../validators/schemes')

module.exports = () => rp({
    method: 'get',
    url: config.ITEMS_API,
    simple: false,
    resolveWithFullResponse: true,
    json: true
}).then(response=>{
    if (response.statusCode!==200){
        throw new Error('Invalid status code')
    }
    const validation = Joi.validate(response.body, schemes.apiItems)
    if (validation.error){
        throw new Error(validation.error.message)
    }
    return response.body
})