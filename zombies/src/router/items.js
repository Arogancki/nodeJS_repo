const createRouter = require('../helpers/createRouter')
    , ItemsManager = require('../models/ItemsManager')
    , errorHandler = require('../helpers/errorHandler')

module.exports = app => {
    return createRouter([{
        method: 'get',
        handler: async (req, res) => {
            try {
                return res.json(await ItemsManager.getTodaysItems())
            } catch (err) {
                return errorHandler(err, req, res)
            }
        }
    }])
}