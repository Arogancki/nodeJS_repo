module.exports = {
    friendlyName: 'get signup',
    description: 'Display "Signup" page.',
    exits: {
        redirect: {
            responseType: 'redirect'
        }
  
    },
    fn: async function (inputs, exits) {
        if (this.req.session.user) 
            delete this.req.session.user
        return exits.redirect('/')
    }
  };  