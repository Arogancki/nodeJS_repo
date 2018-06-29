const router = require('express').Router()

    , redirect = require('../../helpers/redirect')
    , signOut = require('./out')
    , signUp = require('./up')
    , signIn = require('./in')

module.exports = (app) => {
    
    router.use('/out', signOut(app))

    router.use(async (req, res, next)=>{
        if (req.isAuthenticated())
            return redirect(req, res, '/')
        next()
    })

    router.use('/in', signIn(app))
    router.use('/up', signUp(app))
    
    return router
}