module.exports = {
    friendlyName: 'get app',
    description: 'Display "main" page.',
    exits: {
      success: {
        viewTemplatePath: 'app'
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

        return exits.success({
                title: "main",
                links: [
                    {
                        text: 'Sign Out',
                        href: '/sign/out'
                    }
                ],
                data: this.req.session.user.data
            });
        }
  };  