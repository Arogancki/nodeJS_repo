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

function IsMongoInjectionsFree(text) {
    return (/^[^'"\\;{}]*$/g).test(text);
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

function Send401(res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = 401; // error has happend
    res.write("Invalid login or password");
    res.end();
}

function Send403(message, res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = 403; // error has happend
    res.write(message);
    res.end();
}

function SendOk(res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = 200;
    res.end();
}

function SendJson(json,res){
	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 200;
    res.send(json);
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

app.get('/confirm', function (req, res) {
    // zawsze wysylam strone glowna - czy potwierdzono wysle sie na email
    // przykladowy confirm http://localhost:8081/confirm?login=Artur&confirmation=tebzdury
    //req.query.login
    //req.query.confirmation
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    writeTextFromPath(path.join(public, "index.htm"), res);
});

app.post('/registration', function (req, res) {
    if (TextValidation(req.body.login, 3, 20) && TextValidation(req.body.password, 3, 20) && req.body.password === req.body.password2) {
		if (req.body.email !== undefined) {
			if (!EmailValidation(req.body.email)) {
				Send403("Invalid address email",res);
			}
		}
		else {
			req.body.email = "";
		}
		db.InsertUser(req.body.login, req.body.password).done(function (result) {
			if (result){
				db.InsertUserEmail(req.body.login, req.body.email).done(function (result) {
					if (result){
						SendOk(res);
					}
					else{				
						Send403("Account is created. You can't sign in, but email wasn't accepted.",res);
					}
				});
			}
			else{				
				Send403("Login is already taken",res);
			}
        });
    }
});

app.post('/resetpassword', function (req, res) {
    if ( EmailValidation(req.body.email) && TextValidation(req.body.login, 3, 20) ) {
		db.ResetPassword(req.body.login, req.body.email).done(function (newPassword) {
			//TODO wyslac email o resecie z tym co zwrocila funckja
			SendOk(res);
		});
    }
	else{
		Send403("Invalid login or email",res);
	}
});

app.use(function (req, res, next) {
	if (req.method == 'POST'){
		UserValidation(req.body).done(function(valid) {
			if (valid) {
				next();
			}
            else {
			    console.log("Authorization failed");
                Send401(res);
			    return;
            }
		});
    }
});

app.post('/authorization', function (req, res) {
    SendOk(res);
});

app.post('/getBoardsAndInvitations', function (req, res) {
    db.GetUserBoards(req.body.login).done(function (boards) {
		db.GetUserInvitationsInfo(req.body.login).done(function (invitations) {
			SendJson(JSON.stringify({ boards:boards, invitations:invitations }),res);
		});
	});
});

app.post('/CreateNewBoard', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.board)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
    else {
        db.InsertBoard(req.body.board, req.body.login).done(function(result) {
            if (result) {
                SendOk(res);
            } else {
                Send403("You already have board " + req.body.board + ".", res);
            }
        });
    }
});

app.post('/AcceptInviattion', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
	db.AcceptInvitation(req.body.login, req.body.board, req.body.owner).done(function (result) {
		if (result==0){
			SendOk(res);
		}
		else if (result==1){
			Send403("User doesn't exist.",res);
		}
		else{			
			Send403("Board doesn't exist or user hasn't been invited.",res);
		}
	});						
});

app.post('/ReffuseInviattion', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
    db.RefuseInvitation(req.body.login, req.body.board, req.body.owner).done(function (result) {
		if (result==0){
			SendOk(res);
		}
		else if (result==1){
			Send403("User doesn't exist.",res);
		}
		else{			
			Send403("Board doesn't exist or user hasn't been invited.",res);
		}
	});	
});

app.post('/LeaveBoard', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
	db.LeaveBoard(req.body.login, req.body.board, req.body.owner).done(function (result) {
		if (result){
			SendOk(res);
		}
		else{			
			Send403("Board doesn't exist or user isn't the member.",res);
		}
	});
});

app.post('/DeleteBoard', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
    db.DeleteBoard(req.body.login, req.body.board, req.body.owner).done(function (result) {
		if (result){
			SendOk(res);
		}
		else{			
			Send403("Board doesn't exist or user isn't the owner.",res);
		}
	});
});

app.post('/KickOut', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
    db.LeaveBoard(req.body.member, req.body.board, req.body.owner).done(function (result) {
		if (result){
			SendOk(res);
		}
		else{			
			Send403("Board doesn't exist or user isn't the member.",res);
		}
	});
});

app.post('/AddStatus', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.task) || !IsMongoInjectionsFree(req.body.info) || !IsMongoInjectionsFree(req.body.type)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
	db.InsertTaskStatus(req.body.login, req.body.board, req.body.owner, req.body.task, req.body.info, req.body.type).done(function (result) {
		if (result){
			SendOk(res);
		}
		else{			
			Send403("Task doesn't exist.",res);
		}
	});									
});

app.post('/InviteToBoard', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.member)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
	db.InsertInvitation(req.body.login, req.body.member, req.body.board, req.body.owner).done(function (result) {
		if (result==0){
			SendOk(res);
		}
		else if (result==3){
			Send403("User is already invited.",res);
		}
		else if (result==4){
			Send403("User is a member already.",res);
		}
		else if (result==6){
			Send403("User doesn't exist.",res);
		}
		else{			
			Send403("You aren't this board owner.",res);
		}
	});	
});

app.post('/CreateNewTask', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.task) || !IsMongoInjectionsFree(req.body.info)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
	db.InsertTask(req.body.login, req.body.board, req.body.owner, req.body.task, req.body.info).done(function (result) {
		if (result){
			SendOk(res);
		}
		else{			
			Send403("Task already exist.",res);
		}
	});	
});

app.post('/RemoveTask', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.task)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
	db.RemoveTask(req.body.login, req.body.board, req.body.owner, req.body.task).done(function (result) {
		if (result){
			SendOk(res);
		}
		else{			
			Send403("Task doesn't exist.",res);
		}
	});	
});

app.post('/changeUserData', function (req, res) {
    if (!IsMongoInjectionsFree(req.body.newPassword) || !IsMongoInjectionsFree(req.body.newPassword2) || !IsMongoInjectionsFree(req.body.newEmail)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", res);
        return;
    }
    if (req.body.newPassword !== req.body.newPassword2) {
        Send403("Passwords don't match", res);    
    }
    else if (!TextValidation(req.body.newPassword, 3, 20)) {
        Send403("Password dosn't meet the requirements", res); 
    }
    else {
        db.UpdateUser(req.body.login, req.body.newPassword).done(function(result) {
            if (result) {
                if (req.body.newEmail != "") {
                    if (EmailValidation(req.body.newEmail)) {
                        db.InsertUserEmail(req.body.login, req.body.newEmail).done(function (result) {
                            if (result) {
                                SendOk(res);
                            }
                            else {
                                Send403("Email wasn't accepted.", res);
                                db.UpdateUser(req.body.login, req.body.password);
                            }
                        });
                    }
                    else {
                        Send403("Invalid new email address", res);
                        db.UpdateUser(req.body.login, req.body.password);
                    }
                }
                else {
                    SendOk(res);
                }
            }
            else {
                Send403("Didn't found you in database.", res);    
            }
        });
    }
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