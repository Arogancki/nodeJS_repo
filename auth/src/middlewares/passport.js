const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google-oauth20').Strategy
    , UsersCollection = require('../models/UsersCollection')
    , httpStatuses = require('http-status-codes')
    , config = require('../config')

passport.serializeUser((user, done)=>done(null, user._id))

passport.deserializeUser(async function(_id, done) {
    try{
        done(undefined, await UsersCollection.findById(_id))
    }
    catch(err){
        done(err, undefined)
    }
})

passport.externalAuthorization = async (profile, type, cb) => {
    if (cb===undefined){
        cb = (err, data) => {
            if (err){
                throw err
            }
            return data
        }
    }
    const id = `${type}:${profile.id}`
    try{
        return cb(null, await UsersCollection.createNew(id, type, profile))
    }
    catch(err){
        if (err.codeName === "ImmutableField"){
            try{
                const user = await UsersCollection.findOne({id})
                if (!user){
                    throw new Error('User not found but id has been already taken')
                }
                return cb(null, user)
            }
            catch(err){
                return cb(err, null)
            }
        }
        return cb(err, null)
    }
}

passport.use('registration', new LocalStrategy({
    passReqToCallback : true,
    usernameField:"email", 
    passwordField:"password"
}, async function registerUser(req, email, password, done) {
    try{
        return done(null, await UsersCollection.createNew(email, 'LOCAL', {password}))
    }
    catch(err){
        return done(null, false, err.codeName === "ImmutableField" ? httpStatuses.CONFLICT: undefined)
    }
}))

passport.use('authorization', new LocalStrategy({
    passReqToCallback : true,
    usernameField:"email", 
    passwordField:"password"
}, async function loginUser(req, email, password, done) {
    try{
        const user = await UsersCollection.findAndValidate(email, password)
        user && req.session.resetPostAuthLimiter()
        return done(null, user || false)
    }
    catch(err){
        return done(err)
    }
}))

passport.use(new GoogleStrategy({
    callbackURL: config.GOOGLE_DONE_REDIRECT,
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET
}, (accessToken, refreshToken, profile, done)=>passport.externalAuthorization(profile, 'GOOGLE', done)))

passport.use(new FacebookStrategy({
    callbackURL: config.FACEBOOK_DONE_REDIRECT,
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET
}, (accessToken, refreshToken, profile, done)=>passport.externalAuthorization(profile, 'FACEBOOK', done)))

module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())
}