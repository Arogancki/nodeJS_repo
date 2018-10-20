const models = require('../models')
    , { getLocations } = require('./helpers')

module.exports = async (data, socket) => getLocations(socket.client.user)