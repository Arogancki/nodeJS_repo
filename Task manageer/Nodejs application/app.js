const express = require('express');			// web app framework
const fs = require('fs');                     // file streams
const path = require('path');                 // differences between OS
const bodyParser = require('body-parser');    // parse jsondata
const cookieParser = require('cookie-parser');// cookies handling
const db = require('./db.js')();                // database handling application
const nodemailer = require('./emails.js');    // email sending application

const SHOW_JSON_OBJECTS_IN_RESPONSE_LOGS = false;	// constant variable if true json objects will be printed in logs after sending response
const port = 8081;                                // default port for listening
const public = path.join(__dirname, "angular");	// path with public files
const resources = path.join(public, "resources");	// specific files path

const app = express();						        //  create epress configuration object
app.use(bodyParser.json());                         // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());                            // load cookies module for app
app.use(express.static(public))

var address = `localhost:${port}`;   // address site

// get Date for logs
function GetDate() {
    var date = new Date();
    return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-") + " " + [("0" + date.getHours()).slice(-2), ("0" + date.getMinutes()).slice(-2), ("0" + date.getSeconds()).slice(-2), ("0" + date.getMilliseconds()).slice(-2)].join(':');
}

// same format logs
function MakeLog(text,req){
    if (req!==undefined)
        console.log(`${GetDate()}>${req.ip}>${text}`);
    else
        console.log(`${GetDate()}>${text}`);
}

// check if there are mongo forbidden characters
function IsMongoInjectionsFree(text) {
    return /^[^\/\\"$*<>:|?]*$/g.test(text);
}

// check if text is ok
function TextValidation(text, min = 0, max = Infinity) {
    return (text !== undefined) && (/^[a-zA-Z0-9._-]+$/).test(text) && text.length >= min && text.length <= max;
}

// check if email is ok
function EmailValidation(text, min = 0, max = Infinity) {
    return (text !== undefined) && (/^[^\/\\'"@\s]+@[^\/\\'"@\s]+$/).test(text) && text.length >= min && text.length <= max;
}

// send error message
function SendError(message, code, req, res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = code;
    res.write(message);
    res.end();
    MakeLog("Error response: "+message,req);
}

// send "json file" or empty response
function SendOk(req, res, json){
    res.statusCode = 200;
    if (json===undefined){
        res.setHeader('Content-Type', "text/html");
        res.end();
        MakeLog("Response complete: confirmation sent",req);
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(json);
    if (SHOW_JSON_OBJECTS_IN_RESPONSE_LOGS)
        MakeLog("Response complete: json object:\n"+json+"\n",req);
    else
        MakeLog("Response complete: json object sent",req);
}

// send "check login and password"
function UserValidation(body) {
    return new Promise(function(fulfill, reject) {
        if (!TextValidation(body.login, 3, 20) || !TextValidation(body.password, 3, 20)) {
            reject("Invalind login or password");
            return;
        }
        db.Authorization(body.login, body.password).then(function (authentication) {
            fulfill(authentication);
        }, reject);
    });
}

//send mail to user
function SendMailToLogin(login, subject, message, priorytyEmail) {
    if (priorytyEmail !== undefined) {
        nodemailer.send(login, priorytyEmail, subject, message);
    } else {
        db.GetUserEmail(login).then(function(email) {
            nodemailer.send(login, email, subject, message);
        }, ()=>{});
    }
}

// send mail to every board members
function SendMailToBoard(board,owner,subject,message,exception){
    db.GetBoardUsers(board,owner).then(function(users){
        for (let member of users.member) {
            if (member!==exception){
                SendMailToLogin(member,subject,message);
            }
        }
        if (users.owner !== exception) {
            SendMailToLogin(users.owner, subject, message);
        }
    }, ()=>{});
}

//send mail to every 
function SendMailToTaskObservers(board,owner,task,subject,message,exception){
    db.GetTaskObservers(board, owner, task).then(function(users){
        for(let user of users) {
            if (user!==exception){
                SendMailToLogin(user,subject,message);
            }
        }
        if (owner!==exception){
            SendMailToLogin(owner,subject,message);
        }
    }, ()=>{});
}

app.use(function (req, res, next) {
    MakeLog("New request: " + req.method + ":\"" + req.url + "\"", req, res);
    next();
});

// Accessed for all users
app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.get('/bgIMG', function (req, res) {
    res.redirect(`/resources/${Math.ceil(Math.random() * 4)}`);
});

app.get('/favicon.ico', function (req, res) {
    res.redirect(`/resources/favicon.ico`);
});

app.get('/confirm', function (req, res) { // email confirmation
    if (req.query.login !== undefined && IsMongoInjectionsFree(req.query.login) &&
        req.query.confirmation !== undefined && IsMongoInjectionsFree(req.query.confirmation)){
        db.ConfirmEmail(req.query.login, req.query.confirmation).then(function (result) {
            SendMailToLogin(req.query.login,"Email confirmed","Your email is confirmed.<br>You're going to recive notifications from now.");
            res.redirect(`/?message=${encodeURI(Email confirmed.)}`);
        }, function(err){
            res.redirect(`/?message=${encodeURI(err)}`);
        });
    }
    else{
        res.redirect(`/?message=${encodeURI('Invalid login or confirmation code')}`);
    }
});

// Accessed for requests with login and password
app.use(function (req, res, next) {
    if (req.method === 'POST' && req.body)
        next();
    else
        res.redirect(`/?message=${encodeURI('Unsupported request')}`);
})

app.post('/resetpassword', function (req, res) {
    if (EmailValidation(req.body.email) && TextValidation(req.body.login, 3, 20)) {
        db.ResetPassword(req.body.login, req.body.email).then(function (result) {
            SendOk(req, res);
            if (result !== false) {
                SendMailToLogin(result.login, "Your new password", "The password is reset.<br>Your new password<br>" +
                    result.newPassword + "<br>You can change it when you sign in next time.", req.body.email);
            }
        }, function(err){
            SendError(err, 401, req, res);
        });
    }
    else {
        SendError("Invalid login or email", 401, req, res);
    }
});

// cookies handling
app.use(function (req, res, next) {
    let cookieLogin = req.cookies.login;
    if (req.body.login && cookieLogin !== req.body.login) {
        res.cookie('login', req.body.login, { maxAge: 86400000, httpOnly: true });
    }
    else if (!req.body.login && cookieLogin) {
        req.body.login = cookieLogin;
    }

    let cookiePassword = req.cookies.password;
    if (req.body.password && cookiePassword !== req.body.password) {
        res.cookie('password', req.body.password, { maxAge: 86400000, httpOnly: true });
    }
    else if (!req.body.password && cookiePassword) {
        req.body.password = cookiePassword;
    }
    next();
});

app.post('/registration', function (req, res) {
    if (!TextValidation(req.body.login, 3, 20) || !TextValidation(req.body.password, 3, 20) || !(req.body.password === req.body.password2) {
        SendError("Invalid login or password", 400, req, res);
        return;
    }
    if (req.body.email !== "") {
        if (!EmailValidation(req.body.email)) {
            SendError("Invalid address email", 400, req, res);
            return;
        }
    }
    else {
        req.body.email = "";
    }
    db.InsertUser(req.body.login, req.body.password).then(function (result) {
        db.InsertUserEmail(req.body.login, req.body.email).then(function (confirmation){
            res.redirect(`/message=${encodeURI("Account created.")}`);
            let emailbody =`Open this link to confirm your email:<br><a href="${address}/confirm?login=${req.body.login}&confirmation=${confirmation}">Click Here</a>`;
            SendMailToLogin(req.body.login, "Confirm your email", emailbody, req.body.email);
        }, function(err){
            res.redirect(`/message=${encodeURI("Account created. You can't sign in, but email wasn't accepted. You can try to set up a new email in settings.")}`);
        });
    }, function(err){
        SendError(err, 400, req,res);
    });
});

// User validation
app.use(function (req, res, next) {
    db.GetRealName(req.body.login).then(function(realLogin) {
        req.body.login = realLogin;
        UserValidation(req.body).then(function(result) {
            next();
        }, function(err){
            SendError(err, 401, req, res);
        });
    }, function(err){
        SendError(err, 401, req, res);
    });
});

app.post('/authorization', function (req, res) {
    SendOk(req, res, JSON.stringify({ login: req.body.login }));
});

app.post('/getBoardsAndInvitations', function (req, res) {
    db.GetUserBoards(req.body.login).then(function (boards) {
        db.GetUserInvitationsInfo(req.body.login).then(function (invitations) {
            SendOk(req, res, JSON.stringify({ boards, invitations }));
        });
    });
});

app.post('/CreateNewBoard', function (req, res) {
    if (!req.body.board){
        SendError("Board name is undefined.", 400, req,res);
        return;
    }
    if (!IsMongoInjectionsFree(req.body.board)) {
        SendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.InsertBoard(req.body.board, req.body.login).then(function(result) {
        SendOk(req,res);
    }, function(err){
        SendError(`You already have board ${req.body.board}.`, 400, req, res);
    });
});

// board owner validtion
app.use(function (req, res, next) {
    db.GetRealName(req.body.owner).then(function (realLogin) {
        req.body.owner = realLogin;
        next();
    }, function(err){
        next();
    });
});

app.post('/AcceptInviattion', function (req, res) {
    if (!req.body.board || !req.body.owner){
        SendError("Board name or board owner are missing.", 400, req,res);
        return;
    }
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        SendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.AcceptInvitation(req.body.login, req.body.board, req.body.owner).then(function (result) {
        SendOk(req,res);
        let emailBody = `The user<br>${req.body.login}<br>has joined the ${req.body.owner}'s board ${req.body.board}.`;
        SendMailToBoard(req.body.board, req.body.owner, "A member has joined the board", emailBody, req.body.login);
    }, function(err){
        SendError(err, 400, req,res);
    });
});

app.post('/ReffuseInviattion', function (req, res) {
    if (!req.body.board || !req.body.owner){
        SendError("Board name or board owner are missing.", 400, req,res);
        return;
    }
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        SendError("Fields have one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.RefuseInvitation(req.body.login, req.body.board, req.body.owner).then(function (result) {
        SendOk(req,res);
        let emailBody = `The user<br>${req.body.login}<br> refused invitation to your board ${req.body.board}.`;
        SendMailToLogin(req.body.owner, "Invitation to "+req.body.board+" refused", emailBody);
    }, function(err){
        SendError(err, 400, req, res);
    });
});

app.post('/LeaveBoard', function (req, res) {
    if (!req.body.board || !req.body.owner){
        SendError("The board name or the board owner are missing.", 400, req,res);
        return;
    }
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        SendError("Fields have one of unsupported characters: ' \" \\ ; { }", 400 req,res);
        return;
    }
    db.LeaveBoard(req.body.login, req.body.board, req.body.owner).then(function (result) {
        SendOk(req,res);
        let emailBody = `The user<br>${req.body.login}<br>has left the ${req.body.owner}'s board ${req.body.board}.`;
        SendMailToBoard(req.body.board,req.body.owner,"A member has left the board", emailBody,"");
    }, function(err){
        SendError(err,req,res);
    });
});

app.post('/DeleteBoard', function (req, res) {
    if (!req.body.board || !req.body.owner){
        SendError("Board name or board owner are missing.", 400, req,res);
        return;
    }
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        SendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.DeleteBoard(req.body.login, req.body.board, req.body.owner).then(function (result) {
        SendOk(req,res);
        let emailBody = `The board<br>${req.body.board}<br>has been deleted by owner ${req.body.owner}.`;
        SendMailToBoard(req.body.board,req.body.owner, "The board deleted", emailBody, req.body.owner);
    }, function(err){
        SendError(err, 400, req, res);
    });
});

// req.body.member validation
app.use(function (req, res, next) {
    db.GetRealName(req.body.member).then(function (realLogin) {
        req.body.member = realLogin;
        next();
    }, function(err){
        next();
    });
});

app.post('/KickOut', function (req, res) {
    if (!req.body.board || !req.body.owner || !req.body.member){
        SendError("Board name, board owner or member to kick are missing.", 400, req,res);
        return;
    }
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner)) {
        SendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.LeaveBoard(req.body.member, req.body.board, req.body.owner).then(function (result) {
        SendOk(req,res);
        let emailBody = `The owner ${req.body.owner} has kicked out<br>${req.body.member}<br>from his board ${req.body.board}.`;
        SendMailToBoard(req.body. ,req.body.owner ,"A member kicked out", emailBody, req.body.owner);
    }, function(err){
        SendError(err, 400, req,res);
    });
});

app.post('/AddStatus', function (req, res) {
    if (!req.body.board || !req.body.owner || !req.body.task || !req.body.info || !req.body.type){
        SendError("Board name, board owner, task name, comment or comment type are missing.", 400, req,res);
        return;
    }
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) ||
        !IsMongoInjectionsFree(req.body.task) || !IsMongoInjectionsFree(req.body.info) || !IsMongoInjectionsFree(req.body.type)) {
        SendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.InsertTaskStatus(req.body.login, req.body.board, req.body.owner, req.body.task, req.body.info, req.body.type).then(function (result) {
        SendOk(req,res);
        let emailBody = `The user ${req.body.login}<br>added new status <br>${req.body.task} - ${req.body.type}<br>in ${req.body.owner}'s board ${req.body.board}.`;
        SendMailToTaskObservers(req.body.board,req.body.owner,req.body.task, "New status of task", emailBody, req.body.login);
    }, function(err){
        SendError(err, 400, req,res);
    });
});

app.post('/InviteToBoard', function (req, res) {
    if (!req.body.board || !req.body.owner || !req.body.member){
        SendError("Board name, board owner or member to invite are missing.", 400, req,res);
        return;
    }
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.member)) {
        SendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.InsertInvitation(req.body.login, req.body.member, req.body.board, req.body.owner).then(function (result) {
            SendOk(req,res);
            let emailBody = `The user<br>${req.body.login}<br>invited you to the board<br>${req.body.board}<br>You can accept or refuse it after you sign in.`;
            SendMailToLogin(req.body.member,"New invitation waiting", emailBody);
    }, function(err){
        SendError(err, 400, req,res);
    });
});

app.post('/CreateNewTask', function (req, res) {
    if (!req.body.board || !req.body.owner || !req.body.task || !req.body.info){
        SendError("Board name, board owner or member, task name or comment are missing.", 400, req,res);
        return;
    }
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.task) || !IsMongoInjectionsFree(req.body.info)) {
        SendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.InsertTask(req.body.login, req.body.board, req.body.owner, req.body.task, req.body.info).then(function (result) {
        SendOk(req,res);
        let emailBody = `The user<br>${req.body.login}<br>has added new Task:<br>${req.body.task}<br>to ${req.body.owner}'s board ${req.body.board}.`;
        SendMailToBoard(req.body.board,req.body.owner,"New task in board", emailBody, req.body.login);
    }, function(err){
        SendError(err, 400, req,res);
    });
});

app.post('/RemoveTask', function (req, res) {
    if (!req.body.board || !req.body.owner || !req.body.task){
        SendError("Board name, board owner or member or task name are missing.", 400, req,res);
        return;
    }
    if (!IsMongoInjectionsFree(req.body.board) || !IsMongoInjectionsFree(req.body.owner) || !IsMongoInjectionsFree(req.body.task)) {
        SendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.RemoveTask(req.body.login, req.body.board, req.body.owner, req.body.task).done(function (result) {
        SendOk(req,res);
        let emailBody = `${req.body.owner} has removed task:<br>${req.body.task}<br>from his board ${req.body.board}.`;
        SendMailToTaskObservers(req.body.board, req.body.owner, req.body.task, "Task removed", emailBody ,req.body.owner);
    }, function(err){
        SendError(err, 400, req,res);
    });
});

app.post('/changeUserData', function (req, res) {
    // PROMISE ALL I DODAWAC DO TABLICZY PROMISY
    let promises = [];
    // password validation
    if (req.body.newPassword){
        if (req.body.newPassword !== req.body.newPassword2){
            SendError("Passwords does not match", 400, req,res);
            return;
        }
        if (!TextValidation(req.body.newPassword, 3, 20)){
            SendError("New password is invalid.", 400, req,res);
            return;
        }
        if (!IsMongoInjectionsFree(req.body.newPassword)){
            SendError("New password has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
            return;
        }
        promises.push(db.UpdateUser(req.body.login, req.body.newPassword));
    }
    // email validation
    if (req.body.newEmail){
        if (!EmailValidation(req.body.newEmail)){
            SendError("New email is invalid.", 400, req,res);
            return;
        }
        promises.push(db.InsertUserEmail(req.body.login, req.body.newEmail));
    }
    if (!promises.length){
        SendError("New password or new email is missing.", 400, req, res);
        return;
    }
    else{
        Promise.any(promises).then(function(data){
            //TODO
            SendOk(req, res);
            var emailbody = "Open this link to confirm your new email:<br><a href=\"" + address +
                "/confirm?login=" + req.body.login + "&confirmation=" + result + "\">Click Here</a>";
            SendMailToLogin(req.body.login, "Confirm your new email", emailbody, req.body.newEmail);

        }, function(err){
            SendError(err.join("\n"), 400, req, res);
        });
    }
});

let server = app.listen(port, function () {
    address = server.address().address;
    MakeLog(`Server\'s listening on: ${address}:${port}`);
});