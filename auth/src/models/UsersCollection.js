const mongoose = require('mongoose')
    , randomstring = require('randomstring')
    , bcrypt = require('bcrypt-nodejs')
    , config = require('../config')
    , log = require('../helpers/log')
    , sendEmailResetPassword = require('../helpers/sendEmail/resetPassword')
    , sendEmailConfirmation = require('../helpers/sendEmail/emailConfirmation')
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
            },
            emailConfirmed: Boolean,
            emailConfirmationSecret: String,
            resetPasswordSecret: String,
            resetPasswordExpires: Date
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

function getHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

users.methods.generateHash = getHash

users.methods.isValidPassword = function isValidPassword(password){
    if (!this.localProvider.password){
        return false
    }
    return bcrypt.compareSync(password, this.localProvider.password)
}

const model = mongoose.model(config.USERS_DATABASE_NAME, users)

model.sendConfirmationEmail = async function sendConfirmationEmail(email){
    const user = await model.findOne({id: email, "provider": "LOCAL", "localProvider.emailConfirmed": false})
    sendEmailConfirmation(email, `${config.EMAIL_CONFIRMATION_LINK}/?u=${user._id.toString()}&s=${user.localProvider.emailConfirmationSecret}`)
    return user
}

model.createNew = async function createNew(id, provider, providerOptions){
    const newUser = new model()
    newUser.id = id
    newUser.provider = provider
    switch (provider.toUpperCase()) {
        case 'LOCAL':
            newUser.localProvider = {
                password: newUser.generateHash(providerOptions.password), 
                resetPasswordExpires: 0,
                emailConfirmationSecret: randomstring.generate({
                    length: 32,
                    charset: 'alphabetic'
                }),
                emailConfirmed: false
            }
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
    const user = await model.findOneAndUpdate({id}, newUser, {upsert: true, new: true})
    if (provider.toUpperCase()==='LOCAL'){
        await model.sendConfirmationEmail(id)
    }
    return user
}

model.findAndValidate = async function findAndValidate(id, password){
    const user = await model.findOne({id})
    if (!user || !user.isValidPassword(password)){
        return false
    }
    return user
}

model.validatePasswordResetSecret = function validatePasswordResetSecret(id, secret){
    return model.findOne({_id: id, "localProvider.resetPasswordSecret": secret, "localProvider.resetPasswordExpires": {$gt: Date.now()} })
}

model.validateEmailConfirmationSecret = async function validateEmailConfirmationSecret(id, secret){
    await model.updateOne({
        _id: id, 
        "provider": "LOCAL",
        "localProvider.emailConfirmationSecret": secret
    }, {
        "localProvider.emailConfirmed": true
    })
    return model.findOne({
        _id: id, 
        "provider": "LOCAL",
        "localProvider.emailConfirmationSecret": secret
    })
}

model.changePassword = async function changePassword(id, password){
    let r = await model.updateOne({_id: id}, {"localProvider.password": getHash(password)})

    return r
}

model.sendResetPasswordLink = async function sendResetPasswordLink(email){
    const userEmailConfirmed = !!(await model.findOne({
        id: email, 
        "provider": "LOCAL",
        "localProvider.emailConfirmed": true
    }))
    if (!userEmailConfirmed){
        return Promise.reject(403)
    }
    await model.updateOne({
        id: email, 
        "provider": "LOCAL"
    }, {
        "localProvider.resetPasswordSecret": randomstring.generate({
            length: 32,
            charset: 'alphabetic'
        }),
        "localProvider.resetPasswordExpires": Date.now() + (1000*60*60)
    })
    const user = await model.findOne({
        id: email, 
        "provider": "LOCAL"
    })
    if (user){
        return sendEmailResetPassword(email, `${config.PASSWORD_RESET_LINK}/?u=${user._id.toString()}&s=${user.localProvider.resetPasswordSecret}`)
    }
}

if (config.CREATE_DEFAULT_USER){
    model.createNew(config.DEFAULT_USER_NAME, 'LOCAL', {
        password: config.DEFAULT_USER_PASSWORD
    })
    .then(_=>log.debug('Default user created'))
    .catch(err=>
        err.codeName === 'ImmutableField' 
        ? log.debug('Default user already exists')
        : log.error(err)
    )
}

module.exports = model