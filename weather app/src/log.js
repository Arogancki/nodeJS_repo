Object = require('object-mfr')();

function getDate() {
    let date = new Date();
    return [date.getFullYear(), 
        ("0" + (date.getMonth() + 1)).slice(-2), 
        ("0" + date.getDate()).slice(-2)].join("-") 
        + " " + 
        [("0" + date.getHours()).slice(-2), 
        ("0" + date.getMinutes()).slice(-2), 
        ("0" + date.getSeconds()).slice(-2), 
        ("0" + date.getMilliseconds()).slice(-2)].join(':');
}

const logObject = (obj, ind=0) => 
    obj.map((v, k) => {
        if (typeof v === 'object'){
            console.log(`${" ".repeat(2*ind)}${k}: `);
            return logObject(v, ++ind);
        }
        console.log(`${" ".repeat(2*ind)}${k}: ${v},`)
    })

const log = function log(text, req, obj){
    if (req===undefined)
        console.log(`${getDate()} > ${text}`);
    else
        console.log(`${getDate()} > ${req.ip} (${req.session.id}) > ${text}`);
    if (obj)
        typeof obj === 'object' 
        ? logObject(obj)
        : console.log(obj)
}

const logger = function logger(req, res, next) {
    log(`Request: ${req.method} ${req.url}`, req, 
        process.env.LOG_BODY && typeof req.body === 'object' 
        ? req.body : undefined);
    next();
}

exports.log = log;
exports.logger = logger;