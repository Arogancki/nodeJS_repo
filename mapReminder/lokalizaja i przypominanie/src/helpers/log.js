const ts = require('time-stamp')

function consoleLog(...v){
    process.env.LOG==='true'
    && console.log(...v)
}

function getDate() {
    return ts.utc('YYYY-MM-DD HH:mm:ss');
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
    if (req===undefined){
        consoleLog(`${getDate()} > ${text}`)
    }
    else {
        consoleLog(`${getDate()} > ${req.ip} > ${text}`)
    }
    
    if (process.env.LOG_BODY==='true' && obj) {
        if (typeof obj === 'object'){
            logObject(obj)
        }
        else {
            consoleLog(obj)
        }
    }
}

const logger = function logger(req, res, next) {
    log(`Request: ${req.method} ${req.url}`, req, req.body)
    next()
}

exports.log = log
exports.logger = logger