const createRouter = require('../helpers/createRouter')
    , httpStatuses = require('http-status-codes')
    , validJoiScheme = require('../validators/validJoiScheme')
    , schemes = require('../validators/schemes')
    , ZombiesManager = require('../models/ZombiesManager')
    , errorHandler = require('../helpers/errorHandler')

module.exports = app => {
    return createRouter([{
        method: 'get',
        handler: async (req, res) => {
            try {
                return res.json(await ZombiesManager.getAll())
            } catch (err) {
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'put',
        validation: validJoiScheme(schemes.hasName, 'body'),
        handler: async (req, res) => {
            try {
                return res.json(await ZombiesManager.create({ name: req.body.name }))
            } catch (err) {
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'get',
        route: '/:id',
        validation: validJoiScheme(schemes.hasZombieId, 'params'),
        handler: async (req, res) => {
            try {
                return res.json(await ZombiesManager.getWithItems(req.params.id))
            } catch (err) {
                if (err.message === "zombie not found") {
                    return errorHandler({ status: httpStatuses.NOT_FOUND }, req, res)
                }
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'delete',
        route: '/:id',
        validation: validJoiScheme(schemes.hasZombieId, 'params'),
        handler: async (req, res) => {
            try {
                if (await ZombiesManager.remove(req.params.id)) {
                    return res.end()
                }
                throw { status: httpStatuses.NOT_FOUND }
            } catch (err) {
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'put',
        route: '/:id/item',
        validation: [
            validJoiScheme(schemes.hasZombieId, 'params'),
            validJoiScheme(schemes.hasItemId, 'body')
        ],
        handler: async (req, res) => {
            try {
                if (!(await ZombiesManager.addItem(req.params.id, req.body.id))) {
                    throw new Error({ status: httpStatuses.INTERNAL_SERVER_ERROR })
                }
                return res.end()
            } catch (err) {
                if (err.message === "item not found" || err.message === 'zombie not found') {
                    return errorHandler({ status: httpStatuses.NOT_FOUND }, req, res)
                }
                if (err.message === 'zombie has reached a maximum amount of items') {
                    return errorHandler({ status: httpStatuses.NOT_ACCEPTABLE }, req, res)
                }
                return errorHandler(err, req, res)
            }
        }
    }, {
        method: 'delete',
        route: '/:id/item',
        validation: [
            validJoiScheme(schemes.hasZombieId, 'params'),
            validJoiScheme(schemes.hasZombieItemId, 'body')
        ],
        handler: async (req, res) => {
            try {
                if (!(await ZombiesManager.removeItem(req.params.id, req.body.id))) {
                    throw new Error({ status: httpStatuses.INTERNAL_SERVER_ERROR })
                }
                return res.end()
            } catch (err) {
                if (err.message === "zombie does not has this item" || err.message === 'zombie not found') {
                    return errorHandler({ status: httpStatuses.NOT_FOUND }, req, res)
                }
                return errorHandler(err, req, res)
            }
        }
    }])
}