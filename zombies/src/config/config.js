const path = require('path'),
  validators = require('./validators'),
  parsers = require('./parsers');

exports.required = [
  'NODE_ENV',
  'PORT',
  'MONGO_CONNECTION_STRING',
  'EXCHANGE_RATES_API',
  'ITEMS_API'
];

exports.optional = {
  LOG_LEVEL: 'trace', // no, info, debug, trace
  LOG_BODY: true,
  LOG_FILE: path.join(process.cwd(), 'logs.html'),
  LOG_TEMPLATE: path.join(process.cwd(), 'src', 'assets', 'log-template.html'),
  ZOMBIES_DATABASE_NAME: 'zombies',
  ITEMS_DATABASE_NAME: 'items',
  EXCHANGE_RATES_STORE_FILE: path.join(process.cwd(), 'exchange_rates.json'),
  MAX_TRANSACTION_CALLS: 5,
  PRINT_CONFIG: true // level debug
};

exports.parsers = {
  NODE_ENV: parsers.toLower,
  LOG_LEVEL: parsers.toLower,
  LOG_BODY: parsers.toBoleanOrString,
  PRINT_CONFIG: parsers.toBoleanOrString
};

exports.validators = {
  LOG_BODY: validators.isBolean,
  MAX_TRANSACTION_CALLS: validators.isNumber,
  LOG_TEMPLATE: validators.fileExistsIfTrue,
  LOG_FILE: validators.isFilePathValidIfTrue,
  ITEM_STORE_FILE: validators.isFilePathValidIfTrue,
  PRINT_CONFIG: validators.isBolean,
  EXCHANGE_RATES_STORE_FILE: validators.isFilePathValidIfTrue
};
