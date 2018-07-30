const rp = require('request-promise')

function doFunctionFor(fun, time){
    return new Promise(res=>{
        let counter = 0
        let timesUp = false
        setTimeout(Meteor.bindEnvironment(()=>{
            timesUp = true
            res(counter)
        }), time)
        const _fun = ()=>setTimeout(
            Meteor.bindEnvironment(()=>
            Promise.resolve(fun())
            .then(_=>{
                if (timesUp)
                    return
                counter++
                return _fun()
            }))
        )
        _fun()
    })
}

function signIn(username, password){
    if (!Accounts.findUserByUsername(username))
        throw 'not found'
}

function getData(username){
    return signIn(username, '')
}

async function postData(username, text){
    if (!(text.length >=3 && text.length <= 100)){
        throw 'Invalid data'
    }
    await new Promise(res=>Meteor.users.update({username: username}, {username: username}, (err)=>{
        if (err)
            throw err.reason
        res()
    }))
}

function get(url){
    return rp({
        method: 'GET',
        uri: `http://localhost:3012${url}`,
    })
}

module.exports = {
    doFunctionFor,
    signIn,
    postData,
    getData,
    get
}