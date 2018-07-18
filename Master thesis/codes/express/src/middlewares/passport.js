
const LocalStrategy = require('passport-local').Strategy
    , passport = require('passport')
    , users = require('../models/users')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser( async function(id, done) {
    try{
        done(undefined, await users.findById(id))
    }
    catch(err){
        done(err, undefined)
    }
})

passport.use('signUpLocal', new LocalStrategy({
    username: 'username',
    password: 'password',
    passReqToCallback : true
}, async function(req, username, password, done) {

    let newUser = new users()
    newUser.username = username
    newUser.password = newUser.generateHash(password)

    try{
        await users.findOneAndUpdate({'username': username}, newUser, {upsert: true, new: true})
        return done(null, newUser)
    }
    catch(err){
        return done(null, false, req.flash('signUpMessage', 'Username already taken'))
    }
}))

passport.use('signInLocal', new LocalStrategy({
    username: 'username',
    password: 'password',
    passReqToCallback : true
}, async function(req, username, password, done) {
    try{
        let user = await users.findOne({username: username})
        return user && user.validPassword(password)
        ? done(null, user) 
        : done(null, false, req.flash('signInMessage', 'Unauthenticated'))
    }
    catch(err){
        return done(err)
    }
}))

module.exports = passport