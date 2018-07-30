import redirecIf from '../../both/redirectIf'
import isLoggedIn from '../../both/isLoggedIn'

import '../templates/app'

const signRoute = FlowRouter.group({
    prefix: '/app',
    name: 'app',
})

signRoute.route('/', {
    name: 'app',
    action: ()=>{
        if (redirecIf('/sign/in', ()=>!isLoggedIn()))
            return
        BlazeLayout.render('layout', {
            main: 'app',
            links: [
                {
                    text: 'Sign Out',
                    href: '/sign/out'
                }
            ],
            data: []
        })
    }
})