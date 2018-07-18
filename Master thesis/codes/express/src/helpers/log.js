function consoleLog(...v){
    if (process.env.LOG==='true')
        console.log(...v)
}

function getDate() {
    let date = new Date()
    return [date.getFullYear(), 
        ("0" + (date.getMonth() + 1)).slice(-2), 
        ("0" + date.getDate()).slice(-2)].join("-") 
        + " " + 
        [("0" + date.getHours()).slice(-2), 
        ("0" + date.getMinutes()).slice(-2), 
        ("0" + date.getSeconds()).slice(-2), 
        ("0" + date.getMilliseconds()).slice(-2)].join(':')
}

const logObject = (obj, ind=0) => 
    Object.keys(obj).map(v => {
        if (typeof obj[v] === 'object'){
            consoleLog(`${" ".repeat(2*ind)}${v}: `)
            return logObject(obj[v], ++ind)
        }
        consoleLog(`${" ".repeat(2*ind)}${v}: ${obj[v]},`)
    })

const log = function log(text, req, obj){
    if (req===undefined)
        consoleLog(`${getDate()} > ${text}`)
    else
        consoleLog(`${getDate()} > ${req.ip} (${req.session.id}) > ${text}`)
    if (process.env.LOG_BODY==='true' && obj)
        typeof obj === 'object' 
        ? logObject(obj)
        : consoleLog(obj)
}

const logger = function logger(req, res, next) {
    log(`Request: ${req.method} ${req.url}`, req, req.body)
    next()
}

exports.log = log
exports.logger = logger