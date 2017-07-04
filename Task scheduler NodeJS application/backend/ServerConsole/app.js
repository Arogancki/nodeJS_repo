var http = require("http");                         // http protocol - socets, connections
var fs = require('fs');                             //file streams
var qs = require('querystring');                    //unpacking post - into jason
var port = 8081;
var resourcesPath = "resources\\";
var dataBase = require('mongodb').MongoClient;      //MongoDB
var dataBaseUrl = "mongodb://localhost:27017/mydb"; //dataBase address

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

function writeFromPath(path,obj) {
    if (!path || !obj)
        console.log("Undefined: " + path + " or " + obj);
    else {
        fs.readFile(path, function (err, data) {
            if (err) console.log(err);
            obj.write(data);
            obj.end();
        });
    }
}

function HandleGet(req, res) {
    switch (req.url) {
        case "/":
            console.log("Main page file requested");
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            writeFromPath(resourcesPath + "index.htm", res);
            break;
        case "/styles.css":
            console.log("CSS file requested");
            res.setHeader('Content-Type', 'text/css');
            res.statusCode = 200;
            writeFromPath(resourcesPath + "styles.css", res);
            break;
		case "/main.js":
            console.log("JS file requested");
            res.setHeader('Content-Type', 'application/javascript');
            res.statusCode = 200;
            writeFromPath(resourcesPath + "main.js", res);
            break;
        case "/ico":
            console.log("Ico requested");
            res.setHeader('Content-Type', 'image/vnd.microsoft.icon');
            res.statusCode = 200;
            res.write(resourcesPath + "ico");
            res.end();
            break;
        default:
            console.log("Unsupported request");
            res.setHeader('Content-Type', "text / html");
            res.statusCode = 400; //Bad Request
            res.write("Unsupported request");
            res.end();
            break;
    }
}

function HandlePost(req, res, data) {
	if (data.gbImg) {
		console.log("Background image requested "+data.gbImg);
		if (data.gbImg>=1 && data.gbImg<=4) {
			res.setHeader('Content-Type', "image/jpeg");
			res.statusCode = 200;
			res.write(resourcesPath + data.gbImg);
		}
		else {
			res.setHeader('Content-Type', "message");
			res.statusCode = 403;
			res.write("requested bgIMG does not exist");
		}	
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

http.createServer(function (req, res) {
    console.log("\nNew request: " + req.method + " : " + req.url);
    switch (req.method) {
    case "GET":
        HandleGet(req, res);
        break;
    case "POST":
        // if too much POST data, kill the connection
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        var body = "";
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var data = qs.parse(body);
            HandlePost(req, res, data);
            // use post['blah'], etc.
        });
        break;
    default:
        break;
    }
}).listen(port);

console.log("Server started listening on: " + port);

