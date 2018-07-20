module.exports = {
    friendlyName: 'get signup',
    description: 'Display "Signup" page.',
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
                title: "sign up",
                isNew: true,
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
                flashType: 'signUpMessage'
            });
        }
  };  