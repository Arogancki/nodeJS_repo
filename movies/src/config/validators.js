const fs = require("fs-extra"),
    path = require("path"),
    parsers = require("./parsers");

const isBolean = b => (b !== true && b !== false ? "is not bolean" : undefined);
const isDir = d => (!fs.existsSync(d) || !fs.statSync(d).isDirectory() ? `${d} is not a valid directory` : undefined);
const isFilePathValidIfTrue = f => (parsers.toBooleanOrString(f) === true ? isFilePathValid(f) : null);
const isNumber = n => (Number.isNaN(n) ? `${n} is not a number` : undefined);
const isMoreThan = (n, k) => (n < k ? `${n} is not more than ${k}` : undefined);
const fileExistsIfTrue = f => (parsers.toBooleanOrString(f) === true ? fileExists(f) : null);
const isFilePathValid = f => isDir(path.dirname(f));
const fileExists = f => (!fs.existsSync(f) ? `file ${d} doesn't exist` : undefined);

module.exports = {
    isBolean,
    isDir,
    isFilePathValidIfTrue,
    isNumber,
    isMoreThan,
    fileExistsIfTrue,
    isFilePathValid,
    fileExists,
};
