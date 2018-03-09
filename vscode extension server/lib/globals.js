const home = require('os').homedir()

let globals = module.exports = {
    path: home,
    setPath: function(path = home) {
        globals.path = path;
    },
    getPath: function() {
        return globals.path;
    }
}