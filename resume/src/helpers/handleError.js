const { log } = require('./log')
    , render = require('./render')
    , sendEmail = require('./sendEmail')
    , config = require('../config')

module.exports = function handleError(err, req, res) {
    log(`ERROR: ${err.stack || err}`, req)
    if (config.SEND_EMAIL_ON_ERROR)
        sendEmail("RESUME ERROR", err.stack)
        .then(info=>log(`Error email sent: ${err.message}`, req))
        .catch(err=>log(`Could't send error email: ${err.stack}`, req))
    if (res){
        if (config.NODE_ENV === "production")
            return render(req, res.status(500), 'errors/500', {}, false)
        return res.status(500).send(err.message)
    }
}