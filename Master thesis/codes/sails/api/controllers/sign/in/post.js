const Joi = require('joi'), 
    signUpSchema = {
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    }

module.exports = {
    friendlyName: 'Signin',
    description: 'Sign in woth username and password.', 
    inputs: {
        password: {
            type: 'string'
        },
        username:  {
            type: 'string'
        }
    }, 
    exits: {
        success: {
            responseType: 'redirect'
        },
        invalid: {
            responseType: 'redirect'
        },
        redirect: {
            description: 'Authenticated',
            responseType: 'redirect'
        }
    },
    fn: async function (inputs, exits) {
        if (this.req.session.user) {
            return exits.redirect('/')
        }

        const validation = Joi.validate(inputs, signUpSchema)
        if (validation.error){
            this.req.addFlash('signInMessage', validation.error.details[0].message)
            return exits.invalid('/sign/in')
        }
        const userRecord = await User.findOne({
            username: inputs.username.toLowerCase(),
        })

        try {
            await sails.helpers.passwords.checkPassword(inputs.password, userRecord.password)
        }
        catch(e){
            this.req.addFlash('signInMessage', 'Invalid username or password')
            return exits.invalid('/sign/in')
        }

        this.req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge
        this.req.session.user = userRecord
        return exits.success('/')
    }
}  