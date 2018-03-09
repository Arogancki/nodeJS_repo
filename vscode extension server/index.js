const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const portfinder = require('portfinder')

const h = require('./lib/helper')
const { router } = require('./lib/router')

const app = express()
const staticFiles = path.join(__dirname, "..", "public");

app.use(h.logger);
app.use(h.allowEveryOrigin);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(h.headerChecker);
app.use(express.static(staticFiles));

app.use('/', router);

app.use(function(req, res) {
    h.sendError("Not Found", 404, req, res);
});

portfinder.basePort = 8099;
portfinder.getPort(function (err, port) {
    if (err){
        throw err;
    }
    app.set('port', port);
    let server=app.listen(app.get('port'), "127.0.0.1",()=>{
            h.makeLog(`Extension server port: ${port}`);
            //exports.server = server;
            exports.address = {
                port: server.address().port,
                host: server.address().address,
            };
        })
});