require('../app')().then(exp=>{
    console.log('TEST: Checking for broken links...')
    exp.checkBrokenLinks()
    .then(results=>
        results.broken.length
        ? results.broken.forEach((v)=>console.error(`BROKEN LINK: ${v.url} (${v.cause})`))
        : console.log('All links are correct.')
    )
    .then(process.exit)
})