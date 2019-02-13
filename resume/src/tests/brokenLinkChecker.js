require('../app')().then(exp=>{
    console.log('TEST: Checking for broken links...')
    exp.brokenLinkChecker(`${exp.protocol}://localhost:${exp.server.address().port}`)
    .then(results=>{
        if (results.broken.length){
            results.broken.forEach((v)=>console.error(`BROKEN LINK: ${v.url} (${v.cause})`))
            return 1
        }
        console.log('All links are correct.')
        return 0
    })
    .then(process.exit)
})