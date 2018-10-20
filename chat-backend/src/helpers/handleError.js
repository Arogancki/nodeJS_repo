const { log } = require('./log')
    , sendEmail = require('./sendEmail')

module.exports = function handleError(err, req, res) {
    log(`ERROR: ${err.stack}`, req)
    
    return (res && process.env.ENV === "production")
    ? res.status(500).end()
    : res.status(500).send(err.message)
}