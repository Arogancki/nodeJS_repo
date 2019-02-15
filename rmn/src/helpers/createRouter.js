const Router = require('express').Router
    , log = require('./log')
    , config = require('../config')


async function runner(fun, req, res){
    if (typeof fun === typeof (()=>{})){
        return fun(req, res)
    }
    if (typeof fun === typeof []){
        for (f of fun){
            const err = await f(req, res)
            if (err){
                return err
            }
        }
    }
}

function checkPolicies(policies){
    return async function checkPolicies(req, res, next){
        const accessError = policies && await runner(policies, req, res)
        if (accessError){
            req.session.logger(`Access error ${accessError}`)
            return res.sendStatus(accessError)
        }
        return next()
    }
}

function validate(validators){
    return async function validate(req, res, next){
        const validationError = validators && await runner(validators, req, res)
        if (validationError){
            req.session.logger(`Validation error ${validationError.join ? validationError.join(', ') : validationError}`)
            return res.status(400).json(validationError)
        }
        return next()
    }
}

module.exports = function createRouter(routesConfig=[], localRoutes=[]){
    const router = Router()
    routesConfig.forEach(routeConfig=> {
        routeConfig.method = routeConfig.method || 'all'
        routeConfig.route = routeConfig.route || '/'
        const handlers = Array.isArray(routeConfig.handler)
        ? routeConfig.handler
        : [routeConfig.handler]
        handlers.forEach((handler, index)=>{   
            if (typeof handler !== typeof (()=>{})){
                log.warn(`Handler for ${(routeConfig.method + ':') || ''} ${routeConfig.route} i: (${index}) is not a function`)
                routeConfig.handler = (()=>{})
            }
        })
        return router[routeConfig.method](
            routeConfig.route, 
            ...[checkPolicies(routeConfig.policy), 
                validate(routeConfig.validation),
                ...handlers]
        )
    })
    localRoutes.forEach(route => {
        router.use(route.path, route.router)
    })
    return router
}