const home = require('os').homedir()
const path = require('path')

const { writeJsonFile, readJsonFile } = require('./helper')

const FILE = path.join(__dirname, '..', 'resources', 'pathConfig.json')

// init writting
writeJsonFile(FILE, {
    path: home
})

module.exports = {
    setPath: function(path = home) {
        writeJsonFile(FILE, {path});
    },
    getPath: function() {
        return readJsonFile(FILE).path;
    }
}