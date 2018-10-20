const GoogleStrategy = require('passport-google-oauth20')
    , passport = require('passport')
    , users = require('../models/users')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async function(id, done) {
    try{
        done(undefined, await users.findById(id))
    }
    catch(err){
        done(err)
    }
})

passport.use(new GoogleStrategy({
    callbackURL: '/sign/auth/google/cb',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}), async (accessToken, refreshToken, profile, done)=>{
    try{
        const user = await User.findOne({'googleId': googleId})
        if (user)
            return done(null, user)
        const newUser = new User({
            username: profile.displayName,
            googleId: profile.id,
            messages: {}
        })
        await newUser.save()
        return done(null, newUser)
    }
    catch(err){
        return done(err)
    }
})

module.exports = passport