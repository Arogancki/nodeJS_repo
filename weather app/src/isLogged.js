const redirect = require('./redirect')

module.exports = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('signInMessage', 'Unauthenticated')
    redirect(req, res, '/signIn');
}