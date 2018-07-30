import { resetDatabase } from 'meteor/xolvio:cleaner'

const authorization = require('./authorization')
, saveUsersData = require('./saveUsersData')
, getResources = require('./getResources')

let amounts = [1, 5, 30, 150]
let config = {}

describe('Express app tests - functionality', ()=>{
    before(async ()=>{
        resetDatabase()
        Accounts.createUser({
            username: 'username1', password: 'password'
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

})