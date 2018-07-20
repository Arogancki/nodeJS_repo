const Joi = require('joi'), 
    signUpSchema = {
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        password2: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'password does not match' } } })
    }

module.exports = {
    friendlyName: 'Signup',
    description: 'Sign up for a new user account.', 
    inputs: {
        password2: {
            type: 'string'
        },
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
            this.req.addFlash('signUpMessage', validation.error.details[0].message)
            return exits.invalid('/sign/up')
        }
        inputs.username = inputs.username.toLowerCase()
        
        try{
            const newUser = await User.create({
                username: inputs.username,
                password: await sails.helpers.passwords.hashPassword(inputs.password),
                data: []
            })
            .intercept('E_UNIQUE', (err)=>{
                this.req.addFlash('signUpMessage', 'Username already taken')
                throw err
            })
            .intercept({name: 'UsageError'}, (err)=>{
                this.req.addFlash('signUpMessage', err.message)
                throw err
            })
            .fetch()
            this.req.session.user = newUser
            return exits.success('/')
        }
        catch(e){
            return exits.invalid('/sign/up')
        }
    }
}  