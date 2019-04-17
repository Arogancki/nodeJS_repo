const rp = require('request-promise')
    , config = require('../config')
    , fs = require('fs-extra')
    , getLastMidnightTimestamp = require('./getLastMidnightTimestamp')
    , Joi = require('joi')
    , schemes = require('../validators/schemes')

let exchangeRates = null

const fetch = () => rp({
    method: 'get',
    url: config.EXCHANGE_RATES_API,
    simple: false,
    resolveWithFullResponse: true,
    json: true

}).then(response => {
    if (response.statusCode !== 200) {
        return response.statusCode
    }
    const validation = Joi.validate(response.body, schemes.apiCurrency)
    if (validation.error) {
        throw new Error(validation.error.message)
    }
    return {
        effectiveDate: response.body[0].effectiveDate,
        rates: response.body[0].rates
    }
})

module.exports = async () => {
    if (!exchangeRates && await fs.exists(config.EXCHANGE_RATES_STORE_FILE)) {
        exchangeRates = await fs.readJSONSync(config.EXCHANGE_RATES_STORE_FILE)
    }
    if (!exchangeRates || new Date(exchangeRates.effectiveDate) < getLastMidnightTimestamp()) {
        const newestRates = await fetch()
        await fs.writeJSON(config.EXCHANGE_RATES_STORE_FILE, newestRates)
        exchangeRates = newestRates
    }
    return [...exchangeRates.rates, {
        ask: 1,
        bid: 1,
        code: "PLN"
    }]
}
