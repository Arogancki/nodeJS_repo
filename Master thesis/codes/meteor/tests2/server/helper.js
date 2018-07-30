const rp = require('request-promise')
bcrypt = require('bcrypt')

function get(url){
    return rp({
        method: 'GET',
        uri: `http://localhost:3012${url}`,
    })
}

function signUp(username, password, password2){
    return new Promise((res, rej)=>{
        if (!(username && username.length >= 3 && username.length <= 30))
            return rej('Invalid username')
        if (!(/^[a-zA-Z0-9]{3,30}$/.test(password)))
            return rej('Invalid password')
        if (!(password === password2))
            return rej('password confirmation doesn\t match')
        Accounts.createUser({
            username, password
        })
        return res()
    })
}

function signIn(username, password){
    return new Promise((res, rej)=>{
        if (!Accounts.findUserByUsername(username))
            return rej()
        res()
    })
}

function signOut(username, password){
    return new Promise((res, rej)=>{
        signIn(username, password).then(()=>{
            res()
        })
    })
}

function getData(username){
    return new Promise((res, rej)=>{
        let user = Accounts.findUserByUsername(username)
        if (!user)
            rej('user not found')
        res()
    })
}

function postData(username, text){
    return new Promise((res, rej)=>{
        if (!(text.length >=3 && text.length <= 100)){
            return rej('Invalid data')
        }
        Meteor.users.update({username: username}, {username: username}, (err)=>{
            if (err)
                return rej(err.reason)    
            res()
        })
    })
}

module.exports = {
    signUp,
    signIn,
    signOut,
    get,
    getData,
    postData
}