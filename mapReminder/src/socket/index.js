const socket = require('socket.io')
    , auth = require('socketio-auth')
    
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

    , isAuthorized = (auth, fun) => Promise.resolve().then(_=>{
        if (fun==='authenticate' || auth)
            return Promise.resolve()
        return Promise.reject({event: 'isAuthorized', message: 'unauthorized'})
    })
    
    , handle = (socket, fun) => data => Promise.resolve().then(_=>{
        log(`Incoming socket signal: '${fun}'`, {ip: socket.client.id}, data)
        return isAuthorized(socket.auth, fun)
    }).then(_=>
        events[fun](data, socket)
    ).then(data=>{
        socket.emit(`${fun}-done`, data)
        log(`Function ${fun}-done emited`, undefined, data)
        return data
    }).catch(err=>{
        log(`ERROR during ${fun} function: ${err}`)
        socket.emit('err', {event: fun, message: err.message})
        if (fun==='authenticate')
            return Promise.reject(err)
    })

    , authenticate = (socket, data, cb) => handle(socket, 'authenticate')(data).then(data=>{
        socket.client.user=data
        return cb(null, true)
    }).catch(err=>{
        return cb(err, false)
    })

module.exports = server => {
    const io = socket(server)
    auth(io, {authenticate})
    io.on('connection', socket=>{
        socket.on('chase', handle(socket, 'chase'))
        socket.on('put', handle(socket, 'put'))
        socket.on('del', handle(socket, 'del'))
        socket.on('list', handle(socket, 'list')) 
        socket.on('delHis', handle(socket, 'delHis'))
        socket.on('snooze', handle(socket, 'snooze'))
    })
}