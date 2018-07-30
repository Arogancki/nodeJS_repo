const rp = require('request-promise')

function runSimultaneousFun(fun, length){
    const t0 = Date.now()
    let functions = Array.apply(null, new Array(length)).map(Meteor.bindEnvironment(fun))
    return Promise.all(functions).then(_=>Date.now() - t0)
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
    runSimultaneousFun,
    signIn,
    postData,
    getData,
    get
}