const log = require('./helpers/log')
    , sendEmail = require('./helpers/sendEmail')
    , handleError = require('./helpers/handleError')
    , path = require('path')
    , loadJson = require('./helpers/loadJson')
    , wait = require('./helpers/wait')
    , rp = require('request-promise')
    , cheerio = require('cheerio')
    , url = require('url')
    , fs = require('fs-extra-promise')

function saveAndGiveUnchecked(domain, path, elements){
    const history = JSON.parse(fs.readFileSync(process.env.HISTORY_PATH))
    if (!history.hasOwnProperty(domain)){
        history[domain] = {[path]: elements}
    }
    else if (!history[domain].hasOwnProperty(path)){
        history[domain][path] = elements
    }
    else {
        elements = elements.filter(v=>!history[domain][path].includes(v))
        if (elements.length){
            history[domain][path] = history[domain][path].concat(elements)
        }
        else{
            return []
        }
    }
    fs.writeFileSync(process.env.HISTORY_PATH, JSON.stringify(history, null, 2))
    return elements
}

async function check(name, domain, element){
    try {
        let pageCounterActive = false
        let urlAddress = domain.address + element.path
        if (element.pageCounter){
            pageCounterActive = true
            element.pageCounter.current = element.pageCounter.current !== undefined
                ? element.pageCounter.current + 1
                : (element.pageCounter.start || 0)
            if (element.pageCounter.end && element.pageCounter.current >= element.pageCounter.end){
                delete element.pageCounter.current
                return true
            }
            urlAddress = urlAddress.replace(element.pageCounter.alias, element.pageCounter.current)
            log(`getting request for ${domain.address}: ${name} (page: ${element.pageCounter.current})`)
        }
        else{
            log(`getting request for ${domain.address}: ${name}`)
        }

        const html = await rp({
            method: 'GET',
            url: urlAddress,
            headers: domain.headers
        })
        if (html.includes("Are you a human?"))
            throw new Error('THEY KNOW THIS IS A BOT WATCHER!')

        const $ = cheerio.load(html)
        const container = $(element.container)
        const childern = container.find(element.children)
        if (!childern.length){
            if (pageCounterActive){
                delete element.pageCounter.current
                return true
            }
            log(`Got nothing for ${domain.address}: ${name}`)
            return true
        }
        const links = []
        childern.each(async (index, el)=>{
            const elUrl = url.parse(el.attribs.href) 
            const href = elUrl.hostname 
                ? elUrl 
                : domain.address + elUrl.path
            links.push(href)
        })
        const newLinks = saveAndGiveUnchecked(domain.address, element.path, links)
        if (newLinks.length){
            log(newLinks.length, 'new things')
            await sendEmail("Found a new things", `\
            <h1 style="text-align:center;border-bottom:solid 1px #99CCFF;">New things for ${name}!</h1>\
            ${newLinks.map(href=>`<br><a style="text-align:center;" href="${href}">${href}</a>`)}
            `)
            .then(info=>log(`New email sent`))
            .catch(err=>log(`Could't send error email: ${err.message}`))
        }
        else {
            log('nothing new')
        }
        if (pageCounterActive){
            return false
        }
    }
    catch(e){
        handleError(e)
        return true
    }
}

async function checkDomain(domain){
    log(`domain ${domain.address} added to watch`)
    const queue = []
    const addToQueue = (name, domain, element)=>new Promise(res=>queue.push({
            name: name, 
            fun: ()=>check(name, domain, element).then(res)
        })
    )
    const checkQueue = async ()=>{
        while (queue.length){
            await queue.shift().fun()
            await wait(domain.time)
        }
    }
    Object.keys(domain.list).forEach(element=>{
        log(`element ${domain.address}: ${element} added to watch`)
        const checkElement = async ()=>{
            await addToQueue(element, domain, domain.list[element])
            await wait(domain.list[element].time)
            return checkElement()
        }
        return checkElement()
    })
    return (async function infiniteCheck(){
        await checkQueue()
        await wait(process.env.PAUSE)
        return infiniteCheck()
    })()
}

module.exports = async function watch(){
    if (! await fs.existsAsync(process.env.HISTORY_PATH)){
        await fs.writeFileAsync(process.env.HISTORY_PATH, "{}")
    }
    const watchers = await loadJson(process.env.LIST_PATH)
    Object.keys(watchers).forEach(domainKey=>checkDomain(watchers[domainKey]))
}