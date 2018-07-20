const sails = require('sails')

    , sign = require('./sign')
    , app = require('./app')
    , static = require('./static')
    , data = require('./data')

let config = {}

// workaround for sails loging
// add return on sails-hook-api...

describe('Sails app tests - functionality', ()=>{
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
            .then(()=>done())
        })
    })

    static(config)
    sign(config)
    app(config)
    data(config)

    after(async ()=>{
        await sails.models.user.destroy({username: 'username1'})
        return new Promise(r=>sails.lower(r))
    })
})