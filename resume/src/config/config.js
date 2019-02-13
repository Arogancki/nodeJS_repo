const path = require('path')
    , fs = require('fs-extra')

const string2Int = s => +s
const toBoleanOrString = s=> { 
    s = s.toLowerCase ? s.toLowerCase() : s
    if (typeof s === typeof true) {
        return s
    }
    return s==='true'?true:s==='false'?false:s
}
const toLower = s => String(s).toLowerCase()
const isBolean = b => b!==true && b!==false ? 'is not bolean' : undefined
const isDir = d => !fs.existsSync(d) || !fs.statSync(d).isDirectory() ? `${d} is not a valid directory` : undefined
const isFilePathValidIfTrue = f => toBoleanOrString(f)===true ? isFilePathValid(f) : null
const fileExistsIfTrue = f => toBoleanOrString(f)===true ? fileExists(f) : null
const isFilePathValid = f => isDir(path.dirname(f))
const fileExists = f => !fs.existsSync(f) ? `file ${d} doesn't exist` : undefined
const isNumber = n => Number.isNaN(n) ? `${n} is not a number` : undefined
const isMoreThan = (n,k) => (n<k) ? `${n} is not more than ${k}` : undefined

exports.required = [
    "NODE_ENV",
    "PORT"
]

exports.optional = {
    "APP_PUBLIC": path.join(process.cwd(), `src`, `public`),
    "LOG": true,
    "LOG_BODY": false,
    "SECRET": "OaMBtTO1UGw3ZCuPNdYU",
    "COOKIE_MAX_AGE": 1000*60*60*24,
    "HTTPS": true,
    "SSL_CERT_FILE": path.join(process.cwd(), `src`, `assets`, 'ssl-cert.pem'),
    "SSL_KEY_FILE": path.join(process.cwd(), `src`, `assets`, 'ssl-key.pem'),
    "NO_CACHE": true,
    "LIMIT": true,
    "CORS": true,
    "EMAILS": true,
    "EMAIL_LOGIN": "",
    "EMAIL_PASSWORD": "",
    "CONTACT_EMAIL": "",
    "PRINT_CONFIG": true,
    "SEND_EMAIL_ON_ERROR": true
}

exports.parsers = {
    "NODE_ENV": toLower,
    "LOG": toBoleanOrString,
    "LOG_BODY": toBoleanOrString,
    "EMAILS": toBoleanOrString,
    "PRINT_CONFIG": toBoleanOrString,
    "HTTPS": toBoleanOrString,
    "NO_CACHE": toBoleanOrString,
    "CORS": toBoleanOrString,
    "LIMIT": toBoleanOrString,
    "PORT": string2Int,
    "COOKIE_MAX_AGE": string2Int,
    "SSL_CERT_FILE": toBoleanOrString,
    "SSL_KEY_FILE": toBoleanOrString,
    "APP_PUBLIC": toBoleanOrString,
    "SECRET": toBoleanOrString,
    "SEND_EMAIL_ON_ERROR": toBoleanOrString
}

exports.validators = {
    "EMAILS": isBolean,
    "LOG": isBolean,
    "LOG_BODY": isBolean,
    "HTTPS": isBolean,
    "NO_CACHE": isBolean,
    "LIMIT": isBolean,
    "CORS": isBolean,
    "PRINT_CONFIG": isBolean,
    "APP_PUBLIC": isDir,
    "PORT": isNumber,
    "COOKIE_MAX_AGE": isNumber,
    "SSL_CERT_FILE": fileExistsIfTrue, 
    "SSL_KEY_FILE": fileExistsIfTrue,
    "SEND_EMAIL_ON_ERROR": isBolean
}