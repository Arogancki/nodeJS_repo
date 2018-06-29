const mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect(process.env.MONGO || (() => { throw "MONGO PORT IS NOT DEFINED" })())

module.exports = mongoose