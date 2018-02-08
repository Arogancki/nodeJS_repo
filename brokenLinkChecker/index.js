// check for broken links on hexo serve
// start command has to start your server 

var psTree = require('ps-tree');
const blc = require('broken-link-checker')
const spawn = require('child_process').spawn

let child = null
let serverAddress = 'http://localhost:4000/'

let options = {
    cacheResponses: true,
    excludeExternalLinks: true
}

let results = {
    valid: [],
    broken: [],
    excluded: []
}

let htmlChecker = new blc.SiteChecker(options, {
    link: link,
    end: end
})

function kill(pid, signal, callback) {
    signal   = signal || 'SIGKILL'
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            })
            callback()
        })
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback()
    }
};

function link(result){
    let url = `${result.url.original} in file: ${result.base.parsed.path} on line: ${result.html.location.line}`
    if (result.broken)
        results.broken.push({
            url: url,
            cause: result.brokenReason
        })
    else if (result.excluded)
        results.broken.push({
            url: url,
            cause: result.excludedReason
        })
    else
        results.valid.push({
            url: url
        })
}

function end(){
    let badLinks = []
    //results.valid.forEach((v)=>console.log(`VALID LINK:\t${v.url}`))
    results.broken.forEach((v)=>badLinks.push(`BROKEN LINK: ${v.url} (${v.cause})`))
    //results.broken.forEach((v)=>badLinks.push(`EXCLUDED LINK:\t${v.url}\t(${v.cause})`))
    if (badLinks.length) {
        console.error(badLinks.join("\n"))
        processExit(1)
        return
    }
    processExit(0)
}

function processExit(status = 0){
    kill(child.pid, null, ()=>process.exit(status))
}

(function startAndCheck(){
    child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'start'])
    child.stdout.on('data', function (data) {
        if (~data.toString().indexOf('Hexo is running')){
            htmlChecker.enqueue(serverAddress)
        }
    })
    child.stderr.on('data', function (data) {
        kill(child.pid)
        processExit(2)
    })
})()