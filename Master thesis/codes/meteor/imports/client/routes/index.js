import isLoggedIn from '../../both/isLoggedIn'
import redirectIf from '../../both/redirectIf'
import signRouter from './sign'
import appRouter from './app'

import '../templates/layout'
import '../templates/header'

FlowRouter.route('/', {
    name: 'root',
    action: (params, queryParams)=>{
        if (redirectIf('/app', isLoggedIn))
            return
        FlowRouter.go('/sign/in')
    }
});