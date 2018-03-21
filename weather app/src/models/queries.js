const mongoose = require('mongoose');

let queries = new mongoose.Schema({
    cities: [{
        type: String
    }]
});

module.exports = mongoose.model('queries', queries);