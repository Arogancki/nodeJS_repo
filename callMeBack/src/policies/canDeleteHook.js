const WebHooksCollection = require('../models/WebHooksCollection')
    , httpStatuses = require('http-status-codes')
    , log = require('../helpers/log')

module.exports = async function canDeleteHook(req, res, next){
    const id = req.body.id
    const token = req.body.token
    try {
        const hook = await WebHooksCollection.findOne({_id: id, token})
        if (!hook){
            throw new Error(httpStatuses.NOT_FOUND)
        }
        return next()
    }
    catch (err){
        res.sendStatus(httpStatuses.NOT_FOUND)
        return log.debug(`${httpStatuses.NOT_FOUND} sent`)
    }
}