import './sign.html';

Template.sign.events({
    'submit .form-signin': (event)=>{
        event.preventDefault()
        let username = $('[id=username]').val()
        let password = $('[id=username]').val()
        Meteor.loginWithPassword(username, password, (err)=>{
            if (err)
                return FlashMessages.sendError(err.reason)
            FlashMessages.clear()
            FlowRouter.go('/app')
        })
    },
    'submit .form-signup': (event)=>{
        event.preventDefault()
        let username = $('[id=username]').val()
        let password = $('[id=password]').val()
        let password2 = $('[id=password2]').val()
        if (!(username && username.length >= 3 && username.length <= 30))
            return FlashMessages.sendError('Invalid username')
        if (!(/^[a-zA-Z0-9]{3,30}$/.test(password)))
            return FlashMessages.sendError('Invalid password')
        if (!(password === password2))
            return FlashMessages.sendError('password confirmation doesn\t match')
        Accounts.createUser({
            username, password
        }, (err)=>{
            if (err)
                return FlashMessages.sendError(err.reason)
            FlashMessages.clear()
            FlowRouter.go('/app')
        })
    },
})