const socket = require('socket.io')
    
    , { log } = require('../helpers/log')
    , events = {
        authenticate: require('./authenticate'),
        chase: require('./chase'),
        put: require('./put'),
        del: require('./del'),
        list: require('./list'),
        delHis: require('./delHis'),
        snooze: require('./snooze')
    }

    , isAuthorized = (socket, fun) => Promise.resolve().then(_=>{
        if (fun==='authenticate' || socket.client.user)
            return Promise.resolve()
        return Promise.reject({event: 'isAuthorized', message: 'unauthorized'})
    })
    
    , handle = (socket, fun) => data => Promise.resolve().then(_=>{
        log(`Incoming socket signal: '${fun}'`, {ip: socket.client.id}, data)
        return isAuthorized(socket, fun)
    }).then(_=>
        events[fun](data, socket)
    ).then(data=>{
        socket.emit(`${fun}-done`, data)
        log(`Function ${fun}-done emited`, undefined, data)
        return data
    }).catch(err=>{
        log(`ERROR during ${fun} function: ${err.event}: ${err.message}`)
        socket.emit('err', {event: fun, message: err.message})
        if (fun==='authenticate')
            return Promise.reject(err)
    })

module.exports = server =>{
    const io = socket(server)
    io.on('connection', socket=>{
    socket.myBroadcast = (event, data) => io.emit(event, data)
    socket.on('authenticate', handle(socket, 'authenticate'))
    socket.on('chase', handle(socket, 'chase'))
    socket.on('put', handle(socket, 'put'))
    socket.on('del', handle(socket, 'del'))
    socket.on('list', handle(socket, 'list')) 
    socket.on('delHis', handle(socket, 'delHis'))
    socket.on('snooze', handle(socket, 'snooze'))
})}