const mongoose = require('mongoose')
    , bcrypt   = require('bcrypt-nodejs')
 
let users = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

users.methods.generateHash = (password)=>
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

users.methods.validPassword = (password)=>
    bcrypt.compareSync(password, this.local.password)

module.exports = mongoose.model('users',users);