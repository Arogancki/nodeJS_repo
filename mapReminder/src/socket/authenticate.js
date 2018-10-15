const Joi = require('joi')

    , models = require('../models')
    , bcrypt = require('../helpers/bcrypt')
    , signInSchema = {
        email: Joi.string().email().min(3).max(50).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    }

module.exports = async (data, socket)=>{
    const validation = Joi.validate(data, signInSchema)
    if (validation.error){
        return Promise.reject(validation.error.details[0])
    }

    try{
        const user = await models.user.get(data.email)
        if (!await bcrypt.compare(data.password, user.password)){
            throw new Error('Invalid email or password')
        }
        return user
    }
    catch(e){
        throw new Error('Invalid email or password')
    }
}