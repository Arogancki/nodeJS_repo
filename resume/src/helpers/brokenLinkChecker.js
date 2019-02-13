const blc = require('broken-link-checker')
const excluded = [
    require('../assets/socialMediaLinks').find(v=>v.alt==='linkedin').href
]

function link(results){
    return (result)=>{
        let url = `${result.url.original} in file: ${result.base.parsed.path} on line: ${result.html.location.line}`
        if (result.broken)
            return results.broken.push({
                url: url,
                cause: result.brokenReason
            })
        else if (result.excluded)
            return results.broken.push({
                url: url,
                cause: result.excludedReason
            })
        else
            return results.valid.push({
                url: url
            })
    }
}

module.exports = (serverAddress)=>{
    const results = {
        valid: [],
        broken: [],
        excluded: []
    }
    return new Promise(res=>new blc.SiteChecker({
        cacheResponses: true,
        excludeExternalLinks: false,
        excludedKeywords: excluded
    }, {
        link: link(results),
        end: res
    }).enqueue(serverAddress))
    .then(_=>results)
}