﻿const express = require('express')			// web app framework
const fs = require('fs')                     // file streams
const path = require('path')                 // differences between OS
const bodyParser = require('body-parser')    // parse jsondata
const cookieParser = require('cookie-parser') // cookies handling

const h = require('./lib/helper')
const { router } = require('./lib/router')
const globals = require('./lib/globals')

const defaultPort = 3000;                                // default port for listening
const public = path.join(__dirname, "angular");	// path with public files
const resources = path.join(public, "resources");	// specific files path

const app = express();						        //  create epress configuration object

//midlewares
app.use(bodyParser.json());                         // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());                            // load cookies module for app
app.use(h.logger);
app.use(express.static(public));
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

app.set('port', process.env.PORT || defaultPort);

let server = app.listen(app.get('port'), "127.0.0.1", function () {
    globals.address = server.address().address+":"+server.address().port;
    h.makeLog(`Server is listening on: ${globals.address}`);
});