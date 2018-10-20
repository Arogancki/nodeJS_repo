const socketClusterServer = require('socketcluster-server')

module.exports = class Server {
    constructor(httpServer){
        this.httpServer = httpServer
        this.scServer = socketClusterServer.attach(this.httpServer)
        this.addConnectionHandlers()
    }
    connection(socket){
        // console.log('Connected to SC', socket)
    }
    addConnectionHandlers() {
        this.scServer.on('connection', this.connection)
    }
}