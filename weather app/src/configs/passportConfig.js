const LocalStrategy = require('passport-local').Strategy
    , users = require('../models/user')

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        users.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('signUp', new LocalStrategy({
        username: 'username',
        password: 'password',
        passReqToCallback : true
    }, function(req, username, password, done) {
        process.nextTick(()=>{
            User.findOne({'username': username}, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('signUpMessage', 'Username already taken'));
                }
                let newUser = new users();
                newUser.username    = username;
                newUser.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            });
        });
    }));
    return passport;
}