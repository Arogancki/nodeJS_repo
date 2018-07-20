const chai = require('chai')
    , cheerio = require("cheerio")
    , agent = require('supertest').agent

const redirect = {
    post: async function redirectPost(agent, url, body, redirect){
        return new Promise(resolve=>
            agent
            .post(url)
            .send(body)
            .expect(302)
            .end((err, res)=>{
                if (err) throw err
                resolve(chai.expect(res.text.toLowerCase())
                .to.equal(`Found. Redirecting to ${redirect}`.toLowerCase()))
            })
        )
    }
}

async function signIn(agent, username, password){
    return new Promise(resolve=>
        agent
        .post('/sign/in')
        .send({username, password})
        .expect(302)
        .end((err, res)=>{
            if (err) throw err
            chai.expect(res.text.toLowerCase())
            .to.equal(`Found. Redirecting to /`.toLowerCase())
            // agent.jar.setCookie(res.headers['set-cookie'][0])
            return resolve(agent)
        })
    )
}

function doFunctionFor(fun, time){
    return new Promise(res=>{
        let counter = 0
        let timesUp = false
        setTimeout(()=>{
            timesUp = true
            res(counter)
        }, time)
        const _fun = ()=>setTimeout(
            ()=>
            Promise.resolve(fun())
            .then(_=>{
                if (timesUp)
                    return
                counter++
                return _fun()
            })
        , 1)
        _fun()
    })
}

module.exports = {
    redirect,
    signIn,
    doFunctionFor
}