module.exports = {
    friendlyName: 'get signin',
    description: 'Display "Signin" page.',
    exits: {
      success: {
        viewTemplatePath: 'sign'
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

        return exits.success({
                title: "sign in",
                isNew: false,
                links: [
                    {
                        text: 'Sign In',
                        href: '/sign/in'
                    },
                    {
                        text: 'Sign Up',
                        href: '/sign/up'
                    }
                ],
                flashType: 'signInMessage'
            });
        }
  };  