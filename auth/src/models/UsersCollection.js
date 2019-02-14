const mongoose = require('mongoose')
    , bcrypt = require('bcrypt-nodejs')
    , config = require('../config')
    , users = new mongoose.Schema({
        id: {
            type: String,
            trim: true, 
            unique: true,
            minlength: 3,
            maxlength: 20,
            required: true
        },
        provider: {
            type: String,
            required: true
        },
        localProvider: {
            password: {
                type: String,
                minlength: 4,
                maxlength: 40
            }
        },
        googleProvider: {
            type: {
                displayName: String
            }
        },
        facebookProvider: {
            type: {
                  id: String,
                  token: String
            }
        }
    })


users.methods.generateHash = function generateHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
} 

users.methods.isValidPassword = function isValidPassword(password){
    if (!this.localProvider.password){
        return false
    }
    return bcrypt.compareSync(password, this.localProvider.password)
}

const model = mongoose.model(config.USERS_DATABASE_NAME, users)

model.createNew = async function createNew(id, provider, providerOptions){
    const newUser = new model()
    newUser.id = id
    newUser.provider = provider
    switch (provider.toUpperCase()) {
        case 'LOCAL':
            newUser.localProvider = {password: newUser.generateHash(providerOptions.password)}
            break;
        case 'GOOGLE':
            newUser.googleProvider = {displayName: providerOptions.displayName}
            break;
        case 'FACEBOOK':
            newUser.facebookProvider = {displayName: providerOptions.displayName}
            break;
        default:
            throw new Error('Invalid auth type')
    }
    return model.findOneAndUpdate({id}, newUser, {upsert: true, new: true})
}

model.findAndValidate = async function findAndValidate(id, password){
    const user = await model.findOne({id})
    if (!user || !user.isValidPassword(password)){
        return false
    }
    return user
}

module.exports = model