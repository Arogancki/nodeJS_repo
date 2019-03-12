const path = require('path')
    , validators = require('./validators')
    , parsers = require('./parsers')

exports.required = [
    "NODE_ENV",
    "PORT_EXPRESS",
    "PORT_WSDL",
    "URL"
]

exports.optional = {
    "LOG_LEVEL": 'trace', // no, info, debug, trace
    "LOG_BODY": true,
    "LOG_FILE": path.join(process.cwd(), 'logs.html'),
    "LOG_TEMPLATE": path.join(process.cwd(), 'src', 'assets', 'log-template.html')/**/,
    "PRINT_CONFIG": true, // level debug
    "WSDL_FILE": path.join(process.cwd(), 'src', 'assets', 'service.wsdl')/**/,
}

exports.parsers = {
    "NODE_ENV": parsers.toLower,
    "LOG_LEVEL": parsers.toLower,
    "LOG_BODY": parsers.toBoleanOrString,
    "PRINT_CONFIG": parsers.toBoleanOrString,
    "PORT": parsers.string2Int,
    "LOG_TEMPLATE": parsers.toBoleanOrString,
}

exports.validators = {
    "LOG_BODY": validators.isBolean,
    "PRINT_CONFIG": validators.isBolean,
    "PORT": validators.isNumber,
    "LOG_TEMPLATE": validators.fileExistsIfTrue
}