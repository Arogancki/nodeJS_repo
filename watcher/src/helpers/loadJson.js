const fs = require('fs-extra-promise')

module.exports = async function loadJson(path) {
    return JSON.parse(await fs.readFileAsync(path, 'utf8'))
}