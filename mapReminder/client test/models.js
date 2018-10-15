require('dotenv').config({
    path: process.env.NODE_ENV==='production'
    ? './.envProduction'
    : './.envDev'
})

const models = require('../src/models/index')

const ooo={}
models.location.getLocalizations(["1539245324424test", "1539245324776test"])
.then(data=>{
    console.log(data)
})
.catch(data=>{
    console.log(data)
})

const f = () => setTimeout(f,1000)
f()