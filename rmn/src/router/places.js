const createRouter = require('../helpers/createRouter')
    , authenticated = require('../policies/authenticated')
    , ownsPlace = require('../policies/ownsPlace')
    , pm = require('../models/placesManager')
    , schemes = require('../validators/schemes')
    , validJoiScheme = require('../validators/validJoiScheme')
    , errorHandler = require('../helpers/errorHandler')
    , validPlaceStatus = require('../validators/validPlaceStatus')
    , webCallback = require('../policies/webCallback')
    , or = require('../policies/or')

module.exports = app => {
    return createRouter([{
        method: 'get',
        policy: authenticated,
        handler: async (req, res, next)=>{
            try {
                res.json(await pm.userPropsFilter(pm.getAll(req.session.user.userId)))
                return req.session.logger('200 sent')
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'put',
        policy: authenticated,
        validation: validJoiScheme(schemes.placesPut, 'body'),
        handler: async (req, res, next)=>{
            try {
                res.json(await pm.userPropsFilter(pm.create({...req.body, userId: req.session.user.userId})))
                return req.session.logger('200 sent')
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'get',
        policy: [authenticated, ownsPlace],
        route: "/:id",
        validation: validJoiScheme({id: schemes.id}, 'params'),
        handler: async (req, res, next)=>{
            try {
                res.json(await pm.userPropsFilter(pm.get(req.params.id)))
                return req.session.logger('200 sent')
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'post',
        policy: [authenticated, ownsPlace],
        route: "/:id",
        validation: [
            validJoiScheme({id: schemes.id}, 'params'),
            validJoiScheme(schemes.placesIdPost, 'body')
        ],
        handler: async (req, res, next)=>{
            try {
                res.json(await pm.userPropsFilter(pm.update(req.params.id, req.body)))
                return req.session.logger('200 sent')
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'post',
        route: "/:id/set_status",
        policy: or([authenticated, ownsPlace], webCallback),
        validation: [
            validJoiScheme({id: schemes.id}, 'params'),
            validJoiScheme(schemes.placesIdSet_statusPost, 'body'),
            req=>validPlaceStatus(req.params.id, req.body.status)
        ],
        handler: async (req, res, next)=>{
            try {
                res.json(await pm.userPropsFilter(
                    pm.setStatus(req.params.id, req.body.status, req.body.minutes)
                ))
                return req.session.logger('200 sent')
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'post',
        route: "/:id/set_expiration",
        policy: [authenticated, ownsPlace],
        validation: [
            validJoiScheme({id: schemes.id}, 'params'),
            validJoiScheme({minutes: schemes.minutes}, 'body')
        ],
        handler: async (req, res, next)=>{
            try {
                res.json(await pm.userPropsFilter(pm.setExpiredTimeout(req.params.id, req.body.minutes)))
                return req.session.logger('200 sent')
            }
            catch(err){
                return errorHandler(err, req, res)
            }
        }
    }])
}