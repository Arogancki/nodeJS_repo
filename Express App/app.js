var express = require('express');					// web app framework
var http = require("http");                         // http protocol - socets, connections
var fs = require('fs');                             //file streams
var qs = require('querystring');                    //unpacking post - into jason
var path = require('path');                         // differences between OS
var app = express();								// create epress configuration object
var port = 8081;
var dataBase = require('mongodb').MongoClient;      //MongoDB
var dataBaseUrl = "mongodb://localhost:27017/mydb"; //dataBase address
var date = new Date();                              // date object

// remember to run run database in background
// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
function CreateDataBases() {
    dataBase.connect(dataBaseUrl, function(err, db) {
        if (err) console.log(err);
        console.log("Database connected");
        db.createCollection("users", function(err, res) {
            if (err) console.log(err);
            console.log("Users table created!");
            db.close();
        });
        db.createCollection("boards", function(err, res) {
            if (err) console.log(err);
            console.log("Boards table created!");
            db.close();
        });
        db.createCollection("tasks", function(err, res) {
            if (err) console.log(err);
            console.log("Dic_status table created!");
            db.close();
        });
        db.createCollection("statuses", function(err, res) {
            if (err) console.log(err);
            console.log("Statuses table created!");
            db.close();
        });
        db.createCollection("dictionary_status", function(err, res) {
            if (err) console.log(err);
            console.log("Dictionary_status table created!");
            db.close();
        });
    });
}

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
        fs.readFile(path, function(err, data) {
            if (err) {
                console.log(err);
                return 1;
            }
            res.end(data); 
        });
    }
}

function HandlePost(req, res, data) {
    var json = JSON.parse(data);
    if (json.service == "authorization") {
        // check login and password
        console.log("user bleblebleAuthorization complete");
        res.setHeader('Content-Type', "message");
        res.statusCode = 401;
        res.end();
    }
	else {
		console.log("Unsupported request");
        res.setHeader('Content-Type', "message");
        res.statusCode = 400; //Bad Request
        res.write("Unsupported request");
        res.end();
	}
}

app.use(express.static('resources'));

app.use(function(req, res, next){
	console.log("\n"+date.toString()+":\nNew request: " + req.method + " : " + req.url);
	// if too much POST data, kill the connection
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
	if (req.method=="POST")
	{
		var body = "";
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                req.connection.destroy();
        });
	}
	next();
});

app.post('/submit-data', function (req, res) {
    res.send('POST Request');
});

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    writeTextFromPath(path.join(resourcesPath, "index.htm"), res);
});

app.get('/styles.css', function (req, res) {
    res.setHeader('Content-Type', 'text/css');
    res.statusCode = 200;
    writeTextFromPath(path.join(resourcesPath,"styles.css"), res);
});

app.get('/main.js', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript');
     res.statusCode = 200;
     writeTextFromPath(path.join(__dirname, "main.js"), res);
});

app.get('/bgIMG"', function (req, res) {
    var bgIMG = Math.ceil(Math.random() * 4); // 4 is bg quantity
    res.setHeader('Content-Type', "image/jpeg");
    res.statusCode = 200;
    writeImageFromPath(path.join(__dirname,bgIMG.toString()),res);
});

app.get('/favicon.ico', function (req, res) {
    res.setHeader('Content-Type', 'image/vnd.microsoft.icon');
    res.statusCode = 200;
    writeImageFromPath(path.join(__dirname,"favicon.ico"),res);
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.setHeader('Content-Type', "text / html");
    res.statusCode = 400; //Bad Request
    res.write("Unsupported request");
    res.end();
});

var server = app.listen(port, function () {
    console.log('Server has started listening on: '+ server.address().address + ':' + server.address().port);
});