const express = require('express')
const router = express.Router()
const db = require('./db')()
const h = require('./helper')
const emails = require('./emails')
const globals = require('./globals')

// Accessed for all users
/*
router.get('/', function (req, res) {
    if (req.body.login && req.body.password){
        h.userCorretionAndValidation(req, res).then(()=>res.redirect("/App"), ()=>res.redirect("/SignIn"));
        retrun;
    }
    res.redirect("/SignIn");
});
*/

router.get('/confirm', function (req, res) { // email confirmation
    if (req.query.login !== undefined && h.isMongoInjectionsFree(req.query.login) &&
        req.query.confirmation !== undefined && h.isMongoInjectionsFree(req.query.confirmation)){
        db.ConfirmEmail(req.query.login, req.query.confirmation).then(function (result) {
            emails.sendMailToLogin(req.query.login,"Email confirmed","Your email is confirmed.<br>You're going to recive notifications from now.");
            res.redirect(h.getIndexLink(encodeURI('Email confirmed.')));
        }).catch(function(err){
            res.redirect(h.getIndexLink(err));
        });
    }
    else{
        res.redirect(h.getIndexLink('Invalid login or confirmation code'));
    }
});


// Accessed for requests with login and password
router.use(function (req, res, next) {
    if (req.method === 'POST' && req.body)
        next();
    else
        res.redirect(h.getIndexLink('Unsupported request '+req.originalUrl));
})

router.post('/resetpassword', function (req, res) {
    if (h.emailValidation(req.body.email) && h.textValidation(req.body.login, 3, 20)) {
        db.ResetPassword(req.body.login, req.body.email).then(function (result) {
            h.sendOk(req, res);
            if (result !== false) {
                emails.sendMailToLogin(result.login, "Your new password", "The password is reset.<br>Your new password<br>" +
                    result.newPassword + "<br>You can change it when you sign in next time.", req.body.email);
            }
        }).catch(function(err){
            h.sendError(err, 401, req, res);
        });
    }
    else {
        h.sendError("Invalid login or email", 401, req, res);
    }
});

router.post('/registration', function (req, res) {
    if (!h.textValidation(req.body.login, 3, 20) || !h.textValidation(req.body.password, 3, 20) || !(req.body.password === req.body.password2)) {
        h.sendError("Invalid login or password", 400, req, res);
        return;
    }
    if (req.body.email !== "") {
        if (!h.emailValidation(req.body.email)) {
            h.sendError("Invalid address email", 400, req, res);
            return;
        }
    }
    else {
        req.body.email = "";
    }
    db.InsertUser(req.body.login, req.body.password).then(function (result) {
        db.InsertUserEmail(req.body.login, req.body.email).then(function (confirmation){
            res.cookie('login', req.body.login, { maxAge: 86400000, httpOnly: true });
            res.cookie('password', req.body.password, { maxAge: 86400000, httpOnly: true });
            h.sendOk(req, res);
            if (req.body.email) {
				let link = `${globals.dnsAddress}/confirm?login=${req.body.login}&confirmation=${confirmation}`
                let emailbody = `Open this link to confirm your email:<br><a href="${link}">Click Here</a> <br>or copy it to your browser ${link}`;
				console.log("ZLE LINKI W EMAILACH :"+ emailbody)
                emails.sendMailToLogin(req.body.login, "Confirm your email", emailbody, req.body.email);
            }
        }).catch(function(err){
            res.redirect(h.getIndexLink("Account created. You can't sign in, but email wasn't accepted. You can try to set up a new email in settings."));
        });
    }).catch(function(err){
        h.sendError(err, 400, req,res);
    });
});

// User validation
router.use(function (req, res, next) {
    h.userCorretionAndValidation(req, res).then(()=>next()).catch(err=>h.sendError(err, 401, req, res));
});

router.post('/authorization', function (req, res) {
    res.cookie('login', req.body.login, { maxAge: 86400000, httpOnly: true });
    res.cookie('password', req.body.password, { maxAge: 86400000, httpOnly: true });
    h.sendOk(req, res, JSON.stringify({ login: req.body.login }));
});

router.post('/getBoardsAndInvitations', function (req, res) {
    db.GetUserBoards(req.body.login).then(function (boards) {
        db.GetUserInvitationsInfo(req.body.login).then(function (invitations) {
            h.sendOk(req, res, JSON.stringify({ boards, invitations }));
        }).catch(e=>{
            h.sendError(err, 400, req,res);
        });
    }).catch(e=>{
        h.sendError(err, 400, req,res);
    });
});

router.post('/CreateNewBoard', function (req, res) {
    if (!req.body.board){
        h.sendError("Board name is undefined.", 400, req,res);
        return;
    }
    if (!h.isMongoInjectionsFree(req.body.board)) {
        h.sendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.InsertBoard(req.body.board, req.body.login).then(function(result) {
        h.sendOk(req,res);
    }, function(err){
        h.sendError(`You already have board ${req.body.board}.`, 400, req, res);
    }).catch(e=>{
        h.sendError(err, 400, req,res);
    });
});

// board owner validtion
router.use(function (req, res, next) {
    db.GetRealName(req.body.owner).then(function (realLogin) {
        req.body.owner = realLogin;
        next();
    }).catch(e=>{
        next();
    });
});

router.post('/AcceptInviattion', function (req, res) {
    if (!req.body.board || !req.body.owner){
        h.sendError("Board name or board owner are missing.", 400, req,res);
        return;
    }
    if (!h.isMongoInjectionsFree(req.body.board) || !h.isMongoInjectionsFree(req.body.owner)) {
        h.sendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.AcceptInvitation(req.body.login, req.body.board, req.body.owner).then(function (result) {
        h.sendOk(req,res);
        let emailBody = `The user<br>${req.body.login}<br>has joined the ${req.body.owner}'s board ${req.body.board}.`;
        emails.sendMailToBoard(req.body.board, req.body.owner, "A member has joined the board", emailBody, req.body.login);
    }).catch(function(err){
        h.sendError(err, 400, req,res);
    });
});

router.post('/ReffuseInviattion', function (req, res) {
    if (!req.body.board || !req.body.owner){
        h.sendError("Board name or board owner are missing.", 400, req,res);
        return;
    }
    if (!h.isMongoInjectionsFree(req.body.board) || !h.isMongoInjectionsFree(req.body.owner)) {
        h.sendError("Fields have one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.RefuseInvitation(req.body.login, req.body.board, req.body.owner).then(function (result) {
        h.sendOk(req,res);
        let emailBody = `The user<br>${req.body.login}<br> refused invitation to your board ${req.body.board}.`;
        emails.sendMailToLogin(req.body.owner, "Invitation to "+req.body.board+" refused", emailBody);
    }).catch(function(err){
        h.sendError(err, 400, req, res);
    });
});

router.post('/LeaveBoard', function (req, res) {
    if (!req.body.board || !req.body.owner){
        h.sendError("The board name or the board owner are missing.", 400, req,res);
        return;
    }
    if (!h.isMongoInjectionsFree(req.body.board) || !h.isMongoInjectionsFree(req.body.owner)) {
        h.sendError("Fields have one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.LeaveBoard(req.body.login, req.body.board, req.body.owner).then(function (result) {
        h.sendOk(req,res);
        let emailBody = `The user<br>${req.body.login}<br>has left the ${req.body.owner}'s board ${req.body.board}.`;
        emails.sendMailToBoard(req.body.board,req.body.owner,"A member has left the board", emailBody,"");
    }).catch(function(err){
        h.sendError(err,req,res);
    });
});

router.post('/DeleteBoard', function (req, res) {
    if (!req.body.board || !req.body.owner){
        h.sendError("Board name or board owner are missing.", 400, req,res);
        return;
    }
    if (!h.isMongoInjectionsFree(req.body.board) || !h.isMongoInjectionsFree(req.body.owner)) {
        h.sendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.DeleteBoard(req.body.login, req.body.board, req.body.owner).then(function (result) {
        h.sendOk(req,res);
        let emailBody = `The board<br>${req.body.board}<br>has been deleted by owner ${req.body.owner}.`;
        emails.sendMailToBoard(req.body.board,req.body.owner, "The board deleted", emailBody, req.body.owner);
    }).catch(function(err){
        h.sendError(err, 400, req, res);
    });
});

// req.body.member validation
router.use(function (req, res, next) {
    db.GetRealName(req.body.member).then(function (realLogin) {
        req.body.member = realLogin;
        next();
    }).catch(e=>{
        next();
    });
});

router.post('/KickOut', function (req, res) {
    if (!req.body.board || !req.body.owner || !req.body.member){
        h.sendError("Board name, board owner or member to kick are missing.", 400, req,res);
        return;
    }
    if (!h.isMongoInjectionsFree(req.body.board) || !h.isMongoInjectionsFree(req.body.owner)) {
        h.sendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.LeaveBoard(req.body.member, req.body.board, req.body.owner).then(function (result) {
        h.sendOk(req,res);
        let emailBody = `The owner ${req.body.owner} has kicked out<br>${req.body.member}<br>from his board ${req.body.board}.`;
        emails.sendMailToBoard(req.body.board ,req.body.owner ,"A member kicked out", emailBody, req.body.owner);
    }).catch(function(err){
        h.sendError(err, 400, req,res);
    });
});

router.post('/AddStatus', function (req, res) {
    if (!req.body.board || !req.body.owner || !req.body.task || !req.body.info || !req.body.type){
        h.sendError("Board name, board owner, task name, comment or comment type are missing.", 400, req,res);
        return;
    }
    if (!h.isMongoInjectionsFree(req.body.board) || !h.isMongoInjectionsFree(req.body.owner) ||
        !h.isMongoInjectionsFree(req.body.task) || !h.isMongoInjectionsFree(req.body.info) || !h.isMongoInjectionsFree(req.body.type)) {
        h.sendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.InsertTaskStatus(req.body.login, req.body.board, req.body.owner, req.body.task, req.body.info, req.body.type).then(function (result) {
        h.sendOk(req,res);
        let emailBody = `The user ${req.body.login}<br>added new status <br>${req.body.task} - ${req.body.type}<br>in ${req.body.owner}'s board ${req.body.board}.`;
        emails.sendMailToTaskObservers(req.body.board,req.body.owner,req.body.task, "New status of task", emailBody, req.body.login);
    }).catch(function(err){
        h.sendError(err, 400, req,res);
    });
});

router.post('/InviteToBoard', function (req, res) {
    if (!req.body.board || !req.body.owner || !req.body.member){
        h.sendError("Board name, board owner or member to invite are missing.", 400, req,res);
        return;
    }
    if (!h.isMongoInjectionsFree(req.body.board) || !h.isMongoInjectionsFree(req.body.owner) || !h.isMongoInjectionsFree(req.body.member)) {
        h.sendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.InsertInvitation(req.body.login, req.body.member, req.body.board, req.body.owner).then(function (result) {
        h.sendOk(req,res);
        let emailBody = `The user<br>${req.body.login}<br>invited you to the board<br>${req.body.board}<br>You can accept or refuse it after you sign in.`;
        emails.sendMailToLogin(req.body.member,"New invitation waiting", emailBody);
    }).catch(function(err){
        h.sendError(err, 400, req,res);
    });
});

router.post('/CreateNewTask', function (req, res) {
    if (!req.body.board || !req.body.owner || !req.body.task || req.body.info===undefined){
        h.sendError("Board name, board owner or member, task name or comment are missing.", 400, req,res);
        return;
    }
    if (!h.isMongoInjectionsFree(req.body.board) || !h.isMongoInjectionsFree(req.body.owner) || !h.isMongoInjectionsFree(req.body.task) || !h.isMongoInjectionsFree(req.body.info)) {
        h.sendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.InsertTask(req.body.login, req.body.board, req.body.owner, req.body.task, req.body.info).then(function (result) {
        h.sendOk(req,res);
        let emailBody = `The user<br>${req.body.login}<br>has added new Task:<br>${req.body.task}<br>to ${req.body.owner}'s board ${req.body.board}.`;
        emails.sendMailToBoard(req.body.board,req.body.owner,"New task in board", emailBody, req.body.login);
    }).catch(function(err){
        h.sendError(err, 400, req,res);
    });
});

router.post('/RemoveTask', function (req, res) {
    if (!req.body.board || !req.body.owner || !req.body.task){
        h.sendError("Board name, board owner or member or task name are missing.", 400, req,res);
        return;
    }
    if (!h.isMongoInjectionsFree(req.body.board) || !h.isMongoInjectionsFree(req.body.owner) || !h.isMongoInjectionsFree(req.body.task)) {
        h.sendError("Field has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
        return;
    }
    db.RemoveTask(req.body.login, req.body.board, req.body.owner, req.body.task).done(function (result) {
        h.sendOk(req,res);
        let emailBody = `${req.body.owner} has removed task:<br>${req.body.task}<br>from his board ${req.body.board}.`;
        emails.sendMailToTaskObservers(req.body.board, req.body.owner, req.body.task, "Task removed", emailBody ,req.body.owner);
    }).catch(function(err){
        h.sendError(err, 400, req,res);
    });
});

router.post('/changeUserData', function (req, res) {
    let willPasswordChange = false, willEmailChange = false;
    // password validation
    if (req.body.newPassword){
        if (req.body.newPassword !== req.body.newPassword2){
            h.sendError("Passwords does not match", 400, req,res);
            return;
        }
        if (!h.textValidation(req.body.newPassword, 3, 20)){
            h.sendError("New password is invalid.", 400, req,res);
            return;
        }
        if (!h.isMongoInjectionsFree(req.body.newPassword)){
            h.sendError("New password has one of unsupported characters: ' \" \\ ; { }", 400, req,res);
            return;
        }
        willPasswordChange = true;
    }
    // email validation
    if (req.body.newEmail){
        if (!h.emailValidation(req.body.newEmail)){
            h.sendError("New email is invalid.", 400, req,res);
            return;
        }
        willEmailChange = true;

    }
    if (willPasswordChange && willEmailChange) {
        db.UpdateUser(req.body.login, req.body.newPassword, req.body.newEmail).then(function(result){
            h.sendOk(req, res);
            let emailbody = `Open this link to confirm your new email:<br><a href="${globals.dnsAddress}/confirm?login=${req.body.login}&confirmation=${result}">Click Here</a>`;
            emails.sendMailToLogin(req.body.login, "Confirm your new email", emailbody, req.body.newEmail);
        }).catch(function (err) {
            h.sendError(err, 400, req, res);
        });
    }
    else if (willEmailChange) {
        db.InsertUserEmail(req.body.login, req.body.newEmail).then(function (result){
            h.sendOk(req, res);
            let emailbody = `Open this link to confirm your new email:<br><a href="${globals.dnsAddress}/confirm?login=${req.body.login}&confirmation=${result}">Click Here</a>`;
            emails.sendMailToLogin(req.body.login, "Confirm your new email", emailbody, req.body.newEmail);
        }).catch(function (err) {
            sendError(err, 400, req, res);
        });
    }
    else if (willPasswordChange) {
        db.UpdateUser(req.body.login, req.body.newPassword).then(function(result) {
            h.sendOk(req, res);
        }).catch(function(err) {
            h.sendError(err, 400, req, res);
        });
    }
    else {
        h.sendError("A new password or new email has to be set.", 400, req, res);
    }
});

exports.router = router;