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
    "EMAIL_PASSWORD",
    "DONE_REDIRECT",
    "PASSWORD_RESET_LINK",
    "EMAIL_CONFIRMATION_LINK",
    "FACEBOOK_DONE_REDIRECT",
    "GOOGLE_DONE_REDIRECT",
    "SIGNATURE",
    "EMAIL_LOGIN",
    "EMAIL_SERVICE",
]

exports.optional = {
    "LOG_LEVEL": 'trace', // no, info, debug, trace
    "CONFIRM_EMAIL_TEMPLATE_EMAIL": path.join(process.cwd(), `src`, `assets`, 'confirm-email-template-email.html'),
    "RESET_PASSWORD_TEMPLATE_EMAIL": path.join(process.cwd(), `src`, `assets`, 'reset-password-template-email.html'),
    "RESET_PASSWORD_TEMPLATE_SITE": path.join(process.cwd(), `src`, `assets`, 'reset-password-template-site.html'),
    "MESSAGE_TEMPLATE_SITE": path.join(process.cwd(), `src`, `assets`, 'message-template-site.html'),
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
    "PRINT_CONFIG": true, // level debug
    "LOG_TEMPLATE": path.join(process.cwd(), 'src', 'assets', 'log-template.html'),
    "CREATE_DEFAULT_USER": true,
    "DEFAULT_USER_PASSWORD": "user",
    "DEFAULT_USER_NAME": "user@test.com",
}

exports.parsers = {
    "NODE_ENV": parsers.toLower,
    "LOG_LEVEL": parsers.toLower,
    "LOG_BODY": parsers.toBoleanOrString,
    "PRINT_CONFIG": parsers.toBoleanOrString,
    "HTTPS": parsers.toBoleanOrString,
    "LIMITER": parsers.toBoleanOrString,
    "PORT": parsers.string2Int,
    "COOKIE_MAX_AGE": parsers.string2Int,
    "SSL_CERT_FILE": parsers.toBoleanOrString,
    "SSL_KEY_FILE": parsers.toBoleanOrString,
    "CREATE_DEFAULT_USER": parsers.toBoleanOrString
}

exports.validators = {
    "RESET_PASSWORD_TEMPLATE_SITE": validators.fileExistsIfTrue,
    "MESSAGE_TEMPLATE_SITE": validators.fileExistsIfTrue,
    "LOG_BODY": validators.isBolean,
    "CREATE_DEFAULT_USER": validators.isBolean,
    "HTTPS": validators.isBolean,
    "PRINT_CONFIG": validators.isBolean,
    "PORT": validators.isNumber,
    "COOKIE_MAX_AGE": validators.isNumber,
    "SSL_CERT_FILE": validators.fileExistsIfTrue, 
    "SSL_KEY_FILE": validators.fileExistsIfTrue,
    "LOG_FILE": validators.isFilePathValid
}