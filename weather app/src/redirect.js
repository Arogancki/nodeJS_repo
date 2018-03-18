const { log } = require('./log')

module.exports = function redirect(req, res, url){
    res.redirect(url);
    log(`Response: 307`, req, url);
}