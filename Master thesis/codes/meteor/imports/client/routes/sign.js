import redirecIf from '../../both/redirectIf'
import isLoggedIn from '../../both/isLoggedIn'

import '../templates/sign'

const links = [
    {
        text: 'Sign In',
        href: '/sign/in'
    },
    {
        text: 'Sign Up',
        href: '/sign/up'
    }
]

const signRoute = FlowRouter.group({
    prefix: '/sign',
    name: 'sign',
})

signRoute.route('/in', {
    name: 'sign in',
    action: ()=>{
        if (redirecIf('/app', isLoggedIn))
            return
        BlazeLayout.render('layout', {
            main: 'sign',
            isNew: false,
            links: links
        })
    }
})

signRoute.route('/up', {
    name: 'sign up',
    action: ()=>{
        if (redirecIf('/app', isLoggedIn))
            return
        BlazeLayout.render('layout', {
            main: 'sign',
            isNew: true,
            links: links
        })
    }
})

signRoute.route('/out', {
    name: 'sign out',
    action: ()=>{
        if (redirecIf('/sign/in', ()=>!isLoggedIn()))
            return
        Meteor.logout(err=>{
            if (err)
                FlashMessages.sendError(err.reason)
            else
                FlashMessages.sendSuccess('Logged out')
            FlowRouter.go('/sign/in')
        })
    }
})

export default signRoute