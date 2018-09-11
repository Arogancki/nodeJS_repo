const { log } = require('./log')
    , render = require('./render')
    , sendEmail = require('./sendEmail')

module.exports = function handleError(err, req, res) {
    log(`ERROR: ${err.stack}`, req)
    if (process.env.SEND_EMAIL_ON_ERROR === 'true')
        sendEmail("RESUME ERROR", err.stack)
        .then(info=>log(`Error email sent: ${err.message}`, req))
        .catch(err=>log(`Could't send error email: ${err.stack}`, req))
    if (res)
        if (process.env.ENV === "production")
            render(req, res.status(500), 'errors/500', {}, false)
        else
            res.status(500).send(err.message)
}