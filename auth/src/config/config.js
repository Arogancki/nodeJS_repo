const path = require('path')
    , validators = require('./validators')
    , parsers = require('./parsers')

exports.required = [
    "NODE_ENV",
    "PORT",
    "MONGO_CONNECTION_STRING",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "FACEBOOK_APP_ID",
    "FACEBOOK_APP_SECRET",
    "EMAIL_PASSWORD"
]

exports.optional = {
    "LOG_LEVEL": 'trace', // no, info, debug, trace
    "LOG_BODY": true,
    "LOG_FILE": path.join(process.cwd(), 'logs.html'),
    "SESSION_SECRET": "OaMBtTO1UGw3ZCuPNdYU",
    "COOKIE_MAX_AGE": 1000*60*60*24,
    "USERS_DATABASE_NAME": "users_collection",
    "HTTPS": false,
    "REJECT_BLACKLISTED_PASSWORDS": true,
    "SSL_CERT_FILE": path.join(process.cwd(), `src`, `assets`, 'ssl-cert.pem'),
    "SSL_KEY_FILE": path.join(process.cwd(), `src`, `assets`, 'ssl-key.pem'),
    "LIMITER": false,
    "AUTH_LIMITER": true,
    "STORE_SESSION_ON_MONGO": true,
    "PRINT_CONFIG": true, // level debug
    "LOG_TEMPLATE": path.join(process.cwd(), 'src', 'assets', 'log-template.html'),
    "EMAIL_LOGIN": "ziembaartdev@gmail.com"
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
    "SSL_CERT_FILE": validators.fileExistsIfTrue, 
    "SSL_KEY_FILE": validators.fileExistsIfTrue,
    "LOG_FILE": validators.isFilePathValid
}