const log = require('./log')
    , sendEmail = require('./sendEmail')

module.exports = function handleError(err, dontSendEmail=false) {
    log(`ERROR: ${err.message}`)
    if (!dontSendEmail && process.env.SEND_EMAIL_ON_ERROR === 'true')
        sendEmail("WATCHER ERROR", err.stack)
        .then(info=>log(`Error email sent: ${err.message}`))
        .catch(err=>log(`Could't send error email: ${err.message}`))
}