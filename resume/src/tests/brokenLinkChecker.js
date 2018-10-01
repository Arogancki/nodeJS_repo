require('dotenv').config()
require('../app')().then(exp=>{
    console.log('TEST: Checking for broken links...')
    process.env.log = 'false'
    exp.checkBrokenLinks()
    .then(results=>
        results.broken.length
        ? results.broken.forEach((v)=>console.error(`BROKEN LINK: ${v.url} (${v.cause})`))
        : console.log('All links are correct.')
    )
    .then(process.exit)
})