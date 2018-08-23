module.exports = function cookieHandler(req, res, next) {
    let cookieLogin = req.cookies.login;
    if (req.body.login && cookieLogin !== req.body.login) {
        res.cookie('login', req.body.login, { maxAge: 86400000, httpOnly: true });
    }
    else if (!req.body.login && cookieLogin) {
        req.body.login = cookieLogin;
    }

    let cookiePassword = req.cookies.password;
    if (req.body.password && cookiePassword !== req.body.password) {
        res.cookie('password', req.body.password, { maxAge: 86400000, httpOnly: true });
    }
    else if (!req.body.password && cookiePassword) {
        req.body.password = cookiePassword;
    }
    next();
}