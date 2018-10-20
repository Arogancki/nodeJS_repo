const mongoose = require('mongoose')

module.exports = mongoose.model('users', new mongoose.Schema({
    username: {
        type: String
    },
    googleId: {
        type: String
    },
    messages: {
        type: Object
    }
}))