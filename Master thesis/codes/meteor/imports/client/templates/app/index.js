import './app.html'

Template.app.events({
    'submit #form-data': (event, tmpl)=>{
        event.preventDefault()
        const element = document.getElementById('text')
        const text = element.value
        if (!(text.length >=3 && text.length <= 100)){
            return FlashMessages.sendError('Invalid data')
        }
        const data = ((Meteor.user().profile) || {}).data || []
        data.push(text)
        Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.data': data}}, (err)=>{
            if (err)
                return FlashMessages.sendError(err.reason)    
            TemplateVar.set(tmpl, 'data', Meteor.user().profile.data.reverse())
        })
        element.value = ''
    }
})

Template.app.helpers({
    isLogged: function(tmpl) {
        const isLogged = !Meteor.loggingIn()
        if (isLogged && Meteor.user())
            TemplateVar.set(Template.instance(), 'data', Meteor.user().profile.data.reverse())
        return isLogged
    },
})