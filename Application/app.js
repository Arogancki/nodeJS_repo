var express = require('express');				// web app framework
var http = require("http");                  // http protocol - socets, connections
var fs = require('fs');                    // file streams
var qs = require('querystring');           // unpacking post - into jason
var path = require('path');                  // differences between OS
var db = require('./db.js');                    // database handling application
var email = require('./emails.js');                    // email sending application
var bodyParser = require('body-parser');           // parse jsondata
var Promise = require('promise');               // asynchronous returns from functions

var app = express();								//  create epress configuration object
var port = 8081;
var date = new Date();                              // date object
var public = path.join(__dirname, "public");
var resources = path.join(public, "resources");

var SHOW_JSON_OBJECTS_IN_RESPONSE_LOGS = true;	// constant variable if true json objects will be printed in logs after sending response

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function GetDate(){               
    return [date.getFullYear(),("0"+(date.getMonth()+1)).slice(-2),("0"+date.getDate()).slice(-2)].join("-")+" "+[("0"+date.getHours()).slice(-2),("0"+date.getMinutes()).slice(-2),("0"+date.getSeconds()).slice(-2)].join(':');
}

function MakeLog(text,req){
	if (req!==undefined)
		console.log(GetDate()+">"+req.connection.remoteAddress+">"+text);;
	else
		console.log(GetDate()+">"+text);
}

function writeTextFromPath(path, res) {
    if (!path || !res)
        MakeLog("Undefined: " + path + " or " + res);
    else {
        fs.readFile(path, function (err, data) {
            if (err) {
                MakeLog(err);
                return 1;
            }
            res.write(data);
            res.end();
        });
    }
}

function writeImageFromPath(path, res) {
    if (!path || !res)
        MakeLog("Undefined: " + path + " or " + res);
    else {
        fs.readFile(path, function (err, data) {
            if (err) {
                MakeLog(err);
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

function Send401(req,res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = 401; // error has happend
    res.write("Invalid login or password");
    res.end();
	MakeLog("Authorization failed",req);
}

function Send403(message, req, res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = 403; // error has happend
    res.write(message);
    res.end();
	MakeLog("Error response: "+message,req);
}

function SendOk(req,res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = 200;
    res.end();
	MakeLog("Response complete: confirmation sent",req);
}

function SendJson(json,req,res){
	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 200;
    res.send(json);
	if (SHOW_JSON_OBJECTS_IN_RESPONSE_LOGS)
		MakeLog("Response complete: json object:\n"+json+"\n",req);
	else
		MakeLog("Response complete: json object sent",req);
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
    MakeLog("\n" + New request: " + req.method + ":\"" + req.url + "\"",req);
    next();
});

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    writeTextFromPath(path.join(public, "index.htm"), res);
	MakeLog("HTML file sent",req);
});

app.get('/styles.css', function (req, res) {
    res.setHeader('Content-Type', 'text/css');
    res.statusCode = 200;
    writeTextFromPath(path.join(public, "styles.css"), res);
	MakeLog("Css file sent",req);
});

app.get('/main.js', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    res.statusCode = 200;
    writeTextFromPath(path.join(resources, "main.js"), res);
	MakeLog("JavaScript file sent",req);
});

app.get('/bgIMG', function (req, res) {
    var bgIMG = Math.ceil(Math.random() * 4); // 4 is bg quantity
    res.setHeader('Content-Type', "image/jpeg");
    res.statusCode = 200;
    writeImageFromPath(path.join(resources, bgIMG.toString()), res);
	MakeLog("Image file "+bgIMG+" sent",req);
});

app.get('/favicon.ico', function (req, res) {
    res.setHeader('Content-Type', 'image/vnd.microsoft.icon');
    res.statusCode = 200;
    writeImageFromPath(path.join(resources, "favicon.ico"), res);
	MakeLog("Ico file sent",req);
});

app.get('/confirm', function (req, res) {
    // przykladowy confirm http://localhost:8081/confirm?login=Artur&confirmation=randomString
	if (req.query.login !== undefined && IsMongoInjectionsFree(req.query.login) && req.query.confirmation !== undefined && IsMongoInjectionsFree(req.query.confirmation)){
		db.ConfirmEmail(req.query.login, req.query.confirmation).done(function (result) {
			if (result===0){
				//TODO send email with confirmation complete
			}
		});
	}
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    writeTextFromPath(path.join(public, "index.htm"), res);
	MakeLog("HTML file sent",req);
});

app.post('/registration', function (req, res) {
    if (TextValidation(req.body.login, 3, 20) && TextValidation(req.body.password, 3, 20) && req.body.password === req.body.password2) {
		if (req.body.email !== undefined || req.body.email != "") {
			if (!EmailValidation(req.body.email)) {
				Send403("Invalid address email",req,res);
			}
		}
		else {
			req.body.email = "";
		}
		db.InsertUser(req.body.login, req.body.password).done(function (result) {
			if (result){
				db.InsertUserEmail(req.body.login, req.body.email).done(function (result) {
					if (result){
						SendOk(req,res);
					}
					else{				
						Send403("Account is created. You can't sign in, but email wasn't accepted.",req,res);
					}
				});
			}
			else{				
				Send403("Login is already taken",req,res);
			}
        });
    }
});

app.post('/resetpassword', function (req, res) {
    if ( EmailValidation(req.body.email) && TextValidation(req.body.login, 3, 20) ) {
		db.ResetPassword(req.body.login, req.body.email).done(function (newPassword) {
			//TODO wyslac email o resecie z tym co zwrocila funckja
			SendOk(req,res);
		});
    }
	else{
		Send403("Invalid login or email",req,res);
	}
});

app.use(function (req, res, next) {
	if (req.method == 'POST'){
		UserValidation(req.body).done(function(valid) {
			if (valid) {
				next();
			}
            else {
                Send401(req,res);
			    return;
            }
		});
    }
});

app.post('/authorization', function (req, res) {
    SendOk(req,res);
});

app.post('/getBoardsAndInvitations', function (req, res) {
    db.GetUserBoards(req.body.login).done(function (boards) {
		db.GetUserInvitationsInfo(req.body.login).done(function (invitations) {
			SendJson(JSON.stringify({ boards:boards, invitations:invitations }),req,res);
		});
	});
});

app.post('/CreateNewBoard', function (req, res) {
	if (req.body.board===undefined){
		Send403("Board name is undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.board)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
    else {
        db.InsertBoard(req.body.board, req.body.login).done(function(result) {
            if (result) {
                SendOk(req,res);
				return;
            } 
			else {
                Send403("You already have board " + req.body.board + ".", req,res);
				return;
            }
        });
    }
});

app.post('/AcceptInviattion', function (req, res) {
	if (req.body.board===undefined || req.body.owner===undefined){
		Send403("Board name or board owner are undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
	db.AcceptInvitation(req.body.login, req.body.board, req.body.owner).done(function (result) {
		if (result==0){
			SendOk(req,res);
			return;
		}
		else if (result==1){
			Send403("User doesn't exist.",req,res);
			return;
		}
		else{			
			Send403("Board doesn't exist or user hasn't been invited.",req,res);
			return;
		}
	});						
});

app.post('/ReffuseInviattion', function (req, res) {
	if (req.body.board===undefined || req.body.owner===undefined){
		Send403("Board name or board owner are undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
    db.RefuseInvitation(req.body.login, req.body.board, req.body.owner).done(function (result) {
		if (result==0){
			SendOk(req,res);
			return;
		}
		else if (result==1){
			Send403("User doesn't exist.",req,res);
			return;
		}
		else{			
			Send403("Board doesn't exist or user hasn't been invited.",req,res);
			return;
		}
	});	
});

app.post('/LeaveBoard', function (req, res) {
	if (req.body.board===undefined || req.body.owner===undefined){
		Send403("Board name or board owner are undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
	db.LeaveBoard(req.body.login, req.body.board, req.body.owner).done(function (result) {
		if (result){
			SendOk(req,res);
			return;
		}
		else{			
			Send403("Board doesn't exist or user isn't the member.",req,res);
			return;
		}
	});
});

app.post('/DeleteBoard', function (req, res) {
	if (req.body.board===undefined || req.body.owner===undefined){
		Send403("Board name or board owner are undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
    db.DeleteBoard(req.body.login, req.body.board, req.body.owner).done(function (result) {
		if (result){
			SendOk(req,res);
			return;
		}
		else{			
			Send403("Board doesn't exist or user isn't the owner.",req,res);
			return;
		}
	});
});

app.post('/KickOut', function (req, res) {
	if (req.body.board===undefined || req.body.owner===undefined || req.body.member===undefined){
		Send403("Board name, board owner or member to kick are undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
    db.LeaveBoard(req.body.member, req.body.board, req.body.owner).done(function (result) {
		if (result){
			SendOk(req,res);
			return;
		}
		else{			
			Send403("Board doesn't exist or user isn't the member.",req,res);
			return;
		}
	});
});

app.post('/AddStatus', function (req, res) {
	if (req.body.board===undefined || req.body.owner===undefined || req.body.task===undefined || req.body.info===undefined || req.body.type===undefined ){
		Send403("Board name, board owner, task name, comment or comment type are undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.task) || !IsMongoInjectionsFree(req.body.info) || !IsMongoInjectionsFree(req.body.type)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
	db.InsertTaskStatus(req.body.login, req.body.board, req.body.owner, req.body.task, req.body.info, req.body.type).done(function (result) {
		if (result){
			SendOk(req,res);
			return;
		}
		else{			
			Send403("Task doesn't exist.",req,res);
			return;
		}
	});									
});

app.post('/InviteToBoard', function (req, res) {
	if (req.body.board===undefined || req.body.owner===undefined || req.body.member===undefined){
		Send403("Board name, board owner or member to invite are undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.member)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
	db.InsertInvitation(req.body.login, req.body.member, req.body.board, req.body.owner).done(function (result) {
		if (result==0){
			SendOk(req,res);
			return;
		}
		else if (result==3){
			Send403("User is already invited.",req,res);
			return;
		}
		else if (result==4){
			Send403("User is a member already.",req,res);
			return;
		}
		else if (result==6){
			Send403("User doesn't exist.",req,res);
			return;
		}
		else{			
			Send403("You aren't this board owner.",req,res);
			return;
		}
	});	
});

app.post('/CreateNewTask', function (req, res) {
	if (req.body.board===undefined || req.body.owner===undefined || req.body.task===undefined || req.body.info===undefined){
		Send403("Board name, board owner or member, task name or comment are undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.task) || !IsMongoInjectionsFree(req.body.info)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
	db.InsertTask(req.body.login, req.body.board, req.body.owner, req.body.task, req.body.info).done(function (result) {
		if (result){
			SendOk(req,res);
			return;
		}
		else{			
			Send403("Task already exist.",req,res);
			return;
		}
	});	
});

app.post('/RemoveTask', function (req, res) {
	if (req.body.board===undefined || req.body.owner===undefined || req.body.task===undefined){
		Send403("Board name, board owner or member or task name are undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.task)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
	db.RemoveTask(req.body.login, req.body.board, req.body.owner, req.body.task).done(function (result) {
		if (result){
			SendOk(req,res);
			return;
		}
		else{			
			Send403("Task doesn't exist.",req,res);
			return;
		}
	});	
});

app.post('/changeUserData', function (req, res) {
	if (req.body.newPassword===undefined || req.body.newPassword2===undefined || req.body.newEmail===undefined){
		Send403("New password, new password 2 or new email are undefined.", req,res);
		return;
	}
    if (!IsMongoInjectionsFree(req.body.newPassword) || !IsMongoInjectionsFree(req.body.newPassword2) || !IsMongoInjectionsFree(req.body.newEmail)) {
        Send403("Field has one of unsupported characters: ' \" \\ ; { }", req,res);
        return;
    }
    if (req.body.newPassword !== req.body.newPassword2) {
        Send403("Passwords don't match", req,res);    
		return;
    }
    else if (!TextValidation(req.body.newPassword, 3, 20)) {
        Send403("Password dosn't meet the requirements", req,res); 
		return;
    }
    else {
        db.UpdateUser(req.body.login, req.body.newPassword).done(function(result) {
            if (result) {
                if (req.body.newEmail != "") {
                    if (EmailValidation(req.body.newEmail)) {
                        db.InsertUserEmail(req.body.login, req.body.newEmail).done(function (result) {
                            if (result) {
                                SendOk(req,res);
								return;
                            }
                            else {
                                Send403("Email wasn't accepted.", req,res);
                                db.UpdateUser(req.body.login, req.body.password);
								return;
                            }
                        });
                    }
                    else {
                        Send403("Invalid new email address", req,res);
                        db.UpdateUser(req.body.login, req.body.password);
						return;
                    }
                }
                else {
                    SendOk(req,res);
					return;
                }
            }
            else {
                Send403("Didn't found you in database.", req,res);
				return;    
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
        MakeLog('Server has started listening on: ' + server.address().address + ':' + server.address().port);
});