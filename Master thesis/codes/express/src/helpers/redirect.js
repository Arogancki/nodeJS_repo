const { log } = require('./log')

module.exports = function redirect(req, res, url){
    log(`Response: 307`, req, url)
    res.redirect(url)
}