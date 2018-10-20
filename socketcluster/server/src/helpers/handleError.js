const { log } = require('./log')

module.exports = function handleError(err, req, res) {
    log(`ERROR: ${err.stack}`, req)
    if (res) {
        res.status(500)
        if (process.env.ENV === "production")
            return res.end()
        return res.status(500).send(err.message)
    }
}