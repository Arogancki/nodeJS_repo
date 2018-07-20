const sails = require('sails')
    , agent = require('supertest').agent

    , helper = require('./helper')
    , authorization = require('./authorization')
    , saveUsersData = require('./saveUsersData')
    , getResources = require('./getResources')

let amounts = [1, 5, 30, 150]
let config = {}

// workaround for sails loging
// add return on sails-hook-api...

describe('sails app tests - load', ()=>{
    before((done)=>{
        console.log()
        console.log('bringing sails up...')
        sails.lift({
            port: 3099,
            hooks: { grunt: false },
            log: { 
                level: 'silent'
            }
        }, err=>{
            if (err) return done(err)
            console.log('sails\'s up')
            config.sails = sails
            sails.models.user.destroy({username: 'username1'})
            .then(()=>helper.redirect.post(agent(config.sails.hooks.http.app), '/sign/up', {
                username: 'username1',
                password: 'password',
                password2: 'password'
            }, '/'))
            .then(()=>done())
        })
    })

    for (const amount of amounts)
        describe(`${amount} simultaneous requests`, ()=>{
            before(()=>{
                config.amount = amount
            })
            authorization(config)
            saveUsersData(config)
            getResources(config)
        })

    after(async ()=>{
        await sails.models.user.destroy({username: 'username1'})
        return new Promise(r=>sails.lower(r))
    })
})