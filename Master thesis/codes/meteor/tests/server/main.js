import { resetDatabase } from 'meteor/xolvio:cleaner'

const sign = require('./sign')
    , app = require('./app')
    , static = require('./static')
    , data = require('./data')

let config = {}

describe('Express app tests - functionality', ()=>{
    before(async ()=>
        resetDatabase()
    )

    static(config)
    sign(config)
    app(config)
    data(config)
})