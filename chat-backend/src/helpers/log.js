const ts = require('time-stamp')

function consoleLog(...v){
    process.env.LOG==='true'
    && console.log(...v)
}

function getDate() {
    return timestamp.utc('YYYY-MM-DD HH:mm:ss');
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
    (req===undefined)
    ? consoleLog(`${getDate()} > ${text}`)
    : consoleLog(`${getDate()} > ${req.ip} (${req.session.id}) > ${text}`)
    
    (process.env.LOG_BODY==='true' && obj)
    && typeof obj === 'object' 
    ? logObject(obj)
    : consoleLog(obj)
}

const logger = function logger(req, res, next) {
    log(`Request: ${req.method} ${req.url}`, req, req.body)
    next()
}

exports.log = log
exports.logger = logger