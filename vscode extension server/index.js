const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const portfinder = require('portfinder')
const fs = require('fs')

const h = require('./lib/helper')
const { router } = require('./lib/router')

const app = express()
const staticFiles = path.join(__dirname, "..", "public")
const IP = "127.0.0.1";
let dirs = fs.readdirSync(staticFiles).filter(file=>fs.statSync(path.join(staticFiles, file)).isDirectory())
let apps={}; 
let serverOptions = {};

app.use(h.logger);
app.use((req, res, next)=>{
    let port = req.socket.localPort;
    if (apps[port])
        req.url = `/${apps[port]}` + req.url;
    next();
})
app.use(express.static(staticFiles));
app.use((req, res, next)=>{
    let port = req.socket.localPort;
    if (apps[port])
        req.url = req.url.replace(`/${apps[port]}`, '');
    next();
})
app.use(h.allowEveryOrigin);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(h.headerChecker);

app.use('/', router);

app.use('/openDialogBox', function(req, res, next) {
    if (serverOptions.openDialogBox){
        serverOptions.openDialogBox().then(dir=>h.sendOk(req, res, dir && dir[0] || {}));
        return
    }
    next()
});

app.use(function(req, res) {
    h.sendError("Not Found", 404, req, res);
});

module.exports = function(options = {}){
    return new Promise(resolve=>{
        serverOptions = options;
        startApps(dirs, 8099)
            .then(_apps=>{
                apps = Object.assign(apps, _apps);
                for (let port in _apps){
                    _apps[_apps[port]] = port;
                    delete _apps[port]
                }
                resolve({
                    apps: _apps,
                    host: IP
                });
            });
    })
}

function startApps(dirs, port=8000, apps={}){
    return new Promise((resolve, rejected)=>{
        if (!dirs.length){
            resolve(apps);
        }
        else{
            startApp(dirs[0], port)
            .then((port)=>{
                apps[port] = dirs[0];
                resolve(startApps(dirs.slice(1), ++port, apps));
            });
        }
    })
}

function startApp(dir, port){
    return new Promise((resolve, rejected)=>{
        portfinder.basePort = port;
        portfinder.getPortPromise().then(port=>{
            app.set('port', port);
            app.listen(app.get('port'), IP, ()=>{
                h.makeLog(`App for ${dir} is listening port: ${port}`);
                resolve(port);
            });
        }).catch((e)=>{
            fs.writeFileSync('ERROR.log', `${e.message}\n\n${e}`);
            console.error(`${e.message}. Check the ERROR.log file in ${__dirname}`);
            throw(e);
        });
    })
}