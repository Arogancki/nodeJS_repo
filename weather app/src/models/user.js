const mongoose = require('mongoose')
    , bcrypt = require('bcrypt-nodejs')
 
let users = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    data: [{
        type: String
    }]
});

users.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

users.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('users', users)