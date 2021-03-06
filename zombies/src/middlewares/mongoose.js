const mongoose = require('mongoose')
    , config = require('../config')
    , criticalError = require('../helpers/criticalError')

mongoose.Promise = Promise
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(config.MONGO_CONNECTION_STRING, {useNewUrlParser: true})

module.exports = function ensureConnection() {
    return new Promise((res, rej)=>{
        const done = ()=>res(mongoose)
        if (mongoose.connection.db) {
			done()
		}
        mongoose.connection.once('open', done)
        mongoose.connection.on('error', (err)=>rej(criticalError(err)))
    })
}
