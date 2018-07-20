module.exports = {
    friendlyName: 'get data',
    description: 'get user\'s data',
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

        return exits.success(this.req.session.user.data)
    }
}