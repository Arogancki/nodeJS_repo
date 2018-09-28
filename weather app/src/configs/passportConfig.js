const LocalStrategy = require('passport-local').Strategy
    , users = require('../models/user')

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser( async function(id, done) {
        try{
            let user = await users.findById(id)
            done(undefined, user);
        }
        catch(err){
            done(err, undefined);
        }
    });
    passport.use('signUp', new LocalStrategy({
        username: 'username',
        password: 'password',
        passReqToCallback : true
    }, async function(req, username, password, done) {
        try{
            let user = await users.findOne({'username': username});
            if (user) {
                return done(null, false, req.flash('signUpMessage', 'Username already taken'));
            }
        }
        catch(err){
            return done(err);
        }
        let newUser = new users();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        try{
            newUser.save();
        }
        catch(err){
            return done(null, false, req.flash('signUpMessage', err.message));
        }
        return done(null, newUser);
    }));
    passport.use('signIn', new LocalStrategy({
        username: 'username',
        password: 'password',
        passReqToCallback : true
    }, async function(req, username, password, done) {
        try{
            let user = await users.findOne({'username': username});
            if (!user)
                throw new Error('Unauthenticated')
            if (user.validPassword(password)) {
                return done(null, user);
            }
        }
        catch(err){
            return done(err);
        }
        return done(null, false, req.flash('signInMessage', 'Unauthenticated'));
    }));
    return passport;
}