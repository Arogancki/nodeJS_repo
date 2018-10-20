const router = require('express').Router()

    , redirect = require('../../helpers/redirect')
    , signOut = require('./out')
    , auth = require('./auth')

module.exports = (app) => {
    
    router.use('/out', signOut(app))

    router.use(async (req, res, next)=>{
        if (req.isAuthenticated())
            return redirect(req, res, '/')
        next()
    })

    router.use('/auth', auth(app))
    
    return router
}