const mongoose = require('mongoose');
 
module.exports = mongoose.model('histories', new mongoose.Schema({
    username: [{
        type: String, 
        match: /^[a-zA-Z]{2,40}$/  
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
      }
}));