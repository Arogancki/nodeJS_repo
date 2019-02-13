const fs = require('fs-extra')

module.exports = {
    isBolean: b => b!==true && b!==false ? 'is not bolean' : undefined,
    isDir: d => !fs.existsSync(d) || !fs.statSync(d).isDirectory() ? `${d} is not a valid directory` : undefined,
    isFilePathValidIfTrue: f => toBoleanOrString(f)===true ? isFilePathValid(f) : null,
    isNumber: n => Number.isNaN(n) ? `${n} is not a number` : undefined,
    isMoreThan: (n,k) => (n<k) ? `${n} is not more than ${k}` : undefined,
    fileExistsIfTrue: f => toBoleanOrString(f)===true ? fileExists(f) : null,
    isFilePathValid: f => isDir(path.dirname(f)),
    fileExists: f => !fs.existsSync(f) ? `file ${d} doesn't exist` : undefined,
}