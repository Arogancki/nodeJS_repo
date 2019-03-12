const express = require('express')			// web app framework
const fs = require('fs')                     // file streams
const path = require('path')                 // differences between OS
const bodyParser = require('body-parser')    // parse jsondata
const cookieParser = require('cookie-parser') // cookies handling

const cookieHandler = require('./lib/cookieHandler')
const h = require('./lib/helper')
const { router } = require('./lib/router')
const globals = require('./lib/globals')

const public = path.join(__dirname, "angular");	// path with public files
//const public = path.join(__dirname, "react", "src");	// path with public files
const resources = path.join(public, "resources");	// specific files path

const app = express();						        //  create epress configuration object

//midlewares
app.use(bodyParser.json());                         // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());       
app.use(cookieHandler);
app.use(h.logger);
app.use(express.static(public));

app.get('/bgIMG',( req, res)=>{
    fs.readFile(path.join(resources, Math.ceil(Math.random() * 4).toString()), function (err, data) {
        if (err) {
            res.setHeader('Content-Type', "aplication/json");
            res.statusCode = 400;
            h.makeLog(err);
            res.end(err)
            return;
        }
        res.setHeader('Content-Type', "image/jpeg");
        res.statusCode = 200;
        h.makeLog(`Image file sent`,req);
        res.end(data);
    });
});

app.use('/', router);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*
// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    h.makeLog(`${err}`);
    res.redirect(h.getIndexLink(err.message));
});
*/

app.set('port', globals.port);

let server = app.listen(globals.port, "127.0.0.1", function () {
    h.makeLog(`Server is listening on port ${server.address().port}`);
});