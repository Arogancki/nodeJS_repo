const Joi = require('joi')
    
    , postSchema = {
        text: Joi.string().min(3).max(100).required(),
    }

module.exports = {
    friendlyName: 'post data',
    description: 'send user\'s data',
    inputs: {
        text: {
            type: 'string'
        }
    }, 
    exits: {
      success: {
          responseType: 'ok'
      },
      redirect: {
        description: 'Unauthenticated',
        responseType: 'redirect'
      }
    },
    fn: async function (inputs, exits) {
        if (!this.req.session.user) {
            return exits.redirect('/sign/in')
        }
        const validation = Joi.validate(inputs, postSchema)
        if (validation.error){
            this.res.status(422)
            return this.res.send()
        }

        const UserMongo = await User.getDatastore().manager.collection(User.tableName)
        const tx = await UserMongo.findOneAndUpdate({username: this.req.session.user.username},{
            $push: {
                data: {
                    $each: [inputs.text],
                    $position: 0
                }
            }
        })
        this.req.session.user.data = [inputs.text, ...this.req.session.user.data]
        return exits.success(this.req.session.user.data)
    }
}