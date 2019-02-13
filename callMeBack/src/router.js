const httpStatuses = require('http-status-codes')
    , config = require('./config')
    , log = require('./helpers/log')
    , router = require('express').Router()
    , canDeleteHook = require('./policies/canDeleteHook')
    , { celebrate, Joi, errors } = require('celebrate')
    , WebHooksCollection = require('./models/WebHooksCollection')

function errorHandler(err, req, res){
    const status = err.httpStatuses || httpStatuses.INTERNAL_SERVER_ERROR
    res.sendStatus(status).send(
        config.NODE_ENV !== 'production' 
        ? err.stack 
        : httpStatuses.getStatusText(status)
    )
    return log.error(err.stack)
}

router.put('/', celebrate({
    body: Joi.object().keys({
        uri: Joi.string().uri().required(),
        method: Joi.string().uppercase()
            .valid("GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS").required(),
        sec: Joi.number().precision(0).min(config.MIN_TIMER_SEC).max(config.MAX_TIMER_SEC).required(),
        body: Joi.object(),
        auth: Joi.object(),
        headers: Joi.object(),
        retry: Joi.object({
            gap: Joi.number().min(config.MIN_RETRY_GAP).max(config.MAX_RETRY_GAP).required(),
            times: Joi.number().min(config.MIN_RETRY_TIMES).max(config.MAX_RETRY_TIMES).required()
        })
    })
  }), async (req, res) => {
    try{
        const {uri, method, headers, auth, body, retry} = req.body
        res.json(await WebHooksCollection.createNew(req.body.sec, {uri, method, headers, auth, body, retry}))
        return log.info(httpStatuses.OK)
    }
    catch (err){
        errorHandler(err, req, res)
    }
  })

router.delete('/',  celebrate({
    body: Joi.object().keys({
        token: Joi.string().alphanum().required(),
        id: Joi.string().alphanum().required()
    })
  }), canDeleteHook, async (req, res) => { 
    const deleted = await WebHooksCollection.deleteById(req.body.id)
    if (!deleted){
        res.sendStatus(httpStatuses.BAD_REQUEST)
        return log.info(httpStatuses.BAD_REQUEST)
    }
    res.end()
    return log.info(httpStatuses.OK)
})

router.use(errors())

router.use(function notFoundHandler(req, res){
    res.sendStatus(httpStatuses.NOT_FOUND)
    return log.debug(httpStatuses.NOT_FOUND)
})

router.use(errorHandler)

module.exports = router