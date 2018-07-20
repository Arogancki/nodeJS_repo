const chai = require('chai')
    , cheerio = require("cheerio")
    , agent = require('supertest').agent

const redirect = {
    post: async function redirectPost(agent, url, body, redirect){
        return new Promise(resolve=>agent
            .post(url)
            .send(body)
            .expect(302)
            .end((err, res)=>{
                if (err) throw error
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

function runSimultaneousFun(fun, length){
    const t0 = Date.now()
    let functions = Array.apply(null, new Array(length)).map(fun)
    return Promise.all(functions).then(_=>Date.now() - t0)
}

module.exports = {
    redirect,
    signIn,
    runSimultaneousFun
}