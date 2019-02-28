const path = require('path')
    , validators = require('./validators')
    , parsers = require('./parsers')

exports.required = [
    "NODE_ENV",
    "PORT",
    "MONGO_CONNECTION_STRING",
    "AUTH_SERVICE_ADDRESS",
    "CMB_SERVICE_ADDRESS",
    "SERVER_PUBLIC_ADDRESS"
]

exports.optional = {
    "LOG_LEVEL": 'trace', // no, info, debug, trace
    "LOG_BODY": true,
    "LOG_FILE": path.join(process.cwd(), 'logs.html'),
    "LOG_TEMPLATE": path.join(process.cwd(), 'src', 'assets', 'log-template.html')/**/,
    "SESSION_SECRET": "OaMBtTO1UGw3ZCuPNdYU",
    "COOKIE_MAX_AGE": 1000*60*60*24,
    "PLACES_DATABASE_NAME": "places_collection",
    "HTTPS": false,
    "SSL_CERT_FILE": path.join(process.cwd(), `src`, `assets`, 'ssl-cert.pem'),
    "SSL_KEY_FILE": path.join(process.cwd(), `src`, `assets`, 'ssl-key.pem'),
    "NO_CACHE": true,
    "LIMITER": true,
    "CORS": true,
    "STORE_SESSION_ON_MONGO": true,
    "PRINT_CONFIG": true, // level debug
}

exports.parsers = {
    "NODE_ENV": parsers.toLower,
    "LOG_LEVEL": parsers.toLower,
    "SEND_EMAIL_ON_POLICY_ERROR": parsers.toBoleanOrString,
    "SEND_EMAIL_ON_VALIDATION_ERROR": parsers.toBoleanOrString,
    "LOG_BODY": parsers.toBoleanOrString,
    "EMAILS": parsers.toBoleanOrString,
    "PRINT_CONFIG": parsers.toBoleanOrString,
    "STORE_SESSION_ON_MONGO": parsers.toBoleanOrString,
    "HTTPS": parsers.toBoleanOrString,
    "NO_CACHE": parsers.toBoleanOrString,
    "CORS": parsers.toBoleanOrString,
    "CRYPTO_MOCKED": parsers.toBoleanOrString,
    "LIMITER": parsers.toBoleanOrString,
    "AUTH_LIMITER": parsers.toBoleanOrString,
    "USERS_CAN_READ_LOGS": parsers.toBoleanOrString,
    "PORT": parsers.string2Int,
    "PORT_MONGO_ADMIN": parsers.string2Int,
    "PORT_MONGO_PROXY": parsers.string2Int,
    "COOKIE_MAX_AGE": parsers.string2Int,
    "MAX_TIMER_SEC": parsers.string2Int,
    "GENERATED_ROUTES_FILE": parsers.toBoleanOrString,
    "SSL_CERT_FILE": parsers.toBoleanOrString,
    "SSL_KEY_FILE": parsers.toBoleanOrString,
    "LOG_TEMPLATE": parsers.toBoleanOrString,
    "SERVE_LOGS": parsers.toBoleanOrString,
}

exports.validators = {
    "EMAILS": validators.isBolean,
    "LOG_BODY": validators.isBolean,
    "HTTPS": validators.isBolean,
    "NO_CACHE": validators.isBolean,
    "LIMITER": validators.isBolean,
    "CORS": validators.isBolean,
    "STORE_SESSION_ON_MONGO": validators.isBolean,
    "REJECT_BLACKLISTED_PASSWORDS": validators.isBolean,
    "CRYPTO_MOCKED": validators.isBolean,
    "USERS_CAN_READ_LOGS": validators.isBolean,
    "PRINT_CONFIG": validators.isBolean,
    "CREATE_ADMIN": validators.isBolean,
    "APP_PUBLIC": validators.isDir,
    "GENERATED_ROUTES_FILE": validators.isFilePathValidIfTrue,
    "PORT": validators.isNumber,
    "PORT_MONGO_ADMIN": validators.isNumber,
    "COOKIE_MAX_AGE": validators.isNumber,
    "MAX_TIMER_SEC": n=>validators.isNumber(n) || validators.isMoreThan(n, 60),
    "LOG_TEMPLATE": validators.fileExistsIfTrue,
    "SERVE_LOGS":  validators.isFilePathValidIfTrue,
    "SSL_CERT_FILE": validators.fileExistsIfTrue, 
    "SSL_KEY_FILE": validators.fileExistsIfTrue,
    "SEND_EMAIL_ON_POLICY_ERROR": validators.isBolean,
    "SEND_EMAIL_ON_VALIDATION_ERROR": validators.isBolean
}