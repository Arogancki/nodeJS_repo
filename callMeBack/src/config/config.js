const path = require('path')
    , validators = require('./validators')
    , parsers = require('./parsers')

exports.required = [
    "NODE_ENV",
    "PORT",
    "MONGO_CONNECTION_STRING",
]

exports.optional = {
    "LOG_LEVEL": 'trace', // no, info, debug, trace
    "LOG_BODY": true,
    "LOG_FILE": path.join(process.cwd(), 'logs.html'),
    "SESSION_SECRET": "OaMBtTO1UGw3ZCuPNdYU",
    "COOKIE_MAX_AGE": 1000*60*60*24,
    "WEBHOOKS_DATABASE_NAME": "webhooks_collection",
    "HTTPS": false,
    "SSL_CERT_FILE": path.join(process.cwd(), `src`, `assets`, 'ssl-cert.pem'),
    "SSL_KEY_FILE": path.join(process.cwd(), `src`, `assets`, 'ssl-key.pem'),
    "LIMITER": false,
    "STORE_SESSION_ON_MONGO": true,
    "MAX_TIMER_SEC": 60*60*24*365, // one year
    "MIN_TIMER_SEC": 0,
    "MAX_RETRY_GAP": 60*60*24*7,
    "MAX_RETRY_TIMES": 100,
    "MIN_RETRY_GAP": 1,
    "MIN_RETRY_TIMES": -1,
    "PRINT_CONFIG": true, // level debug
    "LOG_TEMPLATE": path.join(process.cwd(), 'src', 'assets', 'log-template.html')
}

exports.parsers = {
    "NODE_ENV": parsers.toLower,
    "LOG_LEVEL": parsers.toLower,
    "LOG_BODY": parsers.toBoleanOrString,
    "PRINT_CONFIG": parsers.toBoleanOrString,
    "STORE_SESSION_ON_MONGO": parsers.toBoleanOrString,
    "HTTPS": parsers.toBoleanOrString,
    "LIMITER": parsers.toBoleanOrString,
    "PORT": parsers.string2Int,
    "COOKIE_MAX_AGE": parsers.string2Int,
    "MAX_TIMER_SEC": parsers.string2Int,
    "MIN_TIMER_SEC": parsers.string2Int,
    "SSL_CERT_FILE": parsers.toBoleanOrString,
    "SSL_KEY_FILE": parsers.toBoleanOrString
}

exports.validators = {
    "LOG_BODY": validators.isBolean,
    "HTTPS": validators.isBolean,
    "STORE_SESSION_ON_MONGO": validators.isBolean,
    "PRINT_CONFIG": validators.isBolean,
    "PORT": validators.isNumber,
    "COOKIE_MAX_AGE": validators.isNumber,
    "MAX_TIMER_SEC": n=>validators.isNumber(n) || validators.isMoreThan(n, 60),
    "SSL_CERT_FILE": validators.fileExistsIfTrue, 
    "SSL_KEY_FILE": validators.fileExistsIfTrue,
    "LOG_FILE": validators.isFilePathValid
}