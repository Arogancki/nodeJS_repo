import { resetDatabase } from 'meteor/xolvio:cleaner'

const authorization = require('./authorization')
, saveUsersData = require('./saveUsersData')
, getResources = require('./getResources')

let times = [2000, 10000, 30000]
let config = {}

describe('Express app tests - functionality', ()=>{
    before(async ()=>{
        resetDatabase()
        Accounts.createUser({
            username: 'username1', password: 'password'
        })
    })
    
    for (const time of times)
        describe(`${time} sec`, ()=>{
            before(()=>{
                config.time = time
            })
            authorization(config)
            saveUsersData(config)
            getResources(config)
        })

})