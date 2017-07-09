var express = require('express');				// web app framework
var http = require("http");                  // http protocol - socets, connections
var fs = require('fs');                    // file streams
var qs = require('querystring');           // unpacking post - into jason
var path = require('path');                  // differences between OS
var db = require('./db.js');                    // database handling application
var bodyParser = require('body-parser');           // parse jsondata
var Promise = require('promise');               // asynchronous returns from functions

var app = express();								//  create epress configuration object
var port = 8081;
var date = new Date();                              // date object
var public = path.join(__dirname, "public");
var resources = path.join(public, "resources");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function writeTextFromPath(path, res) {
    if (!path || !res)
        console.log("Undefined: " + path + " or " + res);
    else {
        fs.readFile(path, function (err, data) {
            if (err) console.log(err);
            res.write(data);
            res.end();
        });
    }
}

function writeImageFromPath(path, res) {
    if (!path || !res)
        console.log("Undefined: " + path + " or " + res);
    else {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err);
                return 1;
            }
            res.end(data);
        });
    }
}

function TextValidation(text, min, max) {
    if (min === undefined) min = 0;
    if (max === undefined) max = Infinity;
    return (text !== undefined) && (/^[a-zA-Z0-9._-]+$/).test(text) && text.length >= min && text.length <= max;
}

function EmailValidation(text, min, max) {
    if (min === undefined) min = 0;
    if (max === undefined) max = Infinity;
    return (text !== undefined) && (/^[^\/\\'"@\s]+@[^\/\\'"@\s]+$/).test(text) && text.length >= min && text.length <= max;
}

function Send403(message, res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = 403; //Bad Request
    res.write(message);
    res.end();
}

function SendOk(res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = 200; //Bad Request
    res.end();
}

function UserValidation(body) {
    return new Promise(function(fulfill, reject) {
        if (!TextValidation(body.login, 3, 20) || !TextValidation(body.password, 3, 20)) {
            fulfill(false);
            return;
        }
        db.Authorization(body.login, body.password).done(function (authentication) {
            fulfill(authentication);
        });
    });
}

app.use(function (req, res, next) {
    console.log("\n" + date.toString() + ":\nNew request: " + req.method + ":\"" + req.url + "\"");
    next();
});

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    writeTextFromPath(path.join(public, "index.htm"), res);
});

app.get('/styles.css', function (req, res) {
    res.setHeader('Content-Type', 'text/css');
    res.statusCode = 200;
    writeTextFromPath(path.join(public, "styles.css"), res);
});

app.get('/main.js', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    res.statusCode = 200;
    writeTextFromPath(path.join(resources, "main.js"), res);
});

app.get('/bgIMG', function (req, res) {
    var bgIMG = Math.ceil(Math.random() * 4); // 4 is bg quantity
    res.setHeader('Content-Type', "image/jpeg");
    res.statusCode = 200;
    writeImageFromPath(path.join(resources, bgIMG.toString()), res);
});

app.get('/favicon.ico', function (req, res) {
    res.setHeader('Content-Type', 'image/vnd.microsoft.icon');
    res.statusCode = 200;
    writeImageFromPath(path.join(resources, "favicon.ico"), res);
});

app.post('/authorization', function (req, res) {
    UserValidation(req.body).done(function(valid) {
        if (valid) {
            SendOk(res);
        }
    });
});

app.post('/registration', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid && req.password === req.password2) {
            if (req.body.email !== undefined) {
                if (!EmailValidation(req.body.email)) {
                    Send403("Invalid address email")
                }
            }
            else {
                req.body.email = "";
            }
            //use method from db
        }
    });
});

app.post('/getBoardsAndInvitations', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {
        
        }
    });
});

app.post('/CreateNewBoard', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.post('/AcceptInviattion', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.post('/ReffuseInviattion', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.post('/LeaveBoard', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.post('/DeleteBoard', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.post('/KickOut', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.post('/AddStatus', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.post('/InviteToBoard', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.post('/CreateNewTask', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.post('/RemoveTask', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.post('/changeUserData', function (req, res) {
    UserValidation(req.body).done(function (valid) {
        if (valid) {

        }
    });
});

app.use(function (req, res, next) {
    console.error("Unsupported request");
    res.setHeader('Content-Type', "text / html");
    res.statusCode = 400; //Bad Request
    res.write("Unsupported request");
    res.end();
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    res.setHeader('Content-Type', "text / html");
    res.statusCode = 404; //Server error
    res.write("Server error");
    res.end();
});

    var server = app.listen(port, function () {
        console.log('Server has started listening on: ' + server.address().address + ':' + server.address().port);
});