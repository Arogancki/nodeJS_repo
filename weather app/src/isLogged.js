const redirect = require('./redirect')

module.exports = (req, res, next)=>req.isAuthenticated()