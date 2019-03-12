const nodemailer = require('nodemailer')

const { makeLog } = require('./helper')
const db = require('./db')()

//email sender data
const SERVER_EMAIL_ADDRESS = process.env.email || 'nodejstaskmanagerapplication@gmail.com';
const SERVER_EMAIL_PASSWORD = process.env.emailPass || '3uHC56T5Op3F0WxxCMMTcCY1kPNmp49xE7lDC9ICCXuX';
const SERVER_NAME = `NodeJS Task manager <${SERVER_EMAIL_ADDRESS}>`;

if (!SERVER_EMAIL_ADDRESS || !SERVER_EMAIL_PASSWORD){
	throw new Error('EMAIL INFO IS NOT PROVIDED')
}

const SERVER_EMAIL_SERVICE = process.env.emailServ || 'gmail';

//set email sender data
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const transporter = nodemailer.createTransport({
    service: SERVER_EMAIL_SERVICE,
    auth: {
        user: SERVER_EMAIL_ADDRESS,
        pass: SERVER_EMAIL_PASSWORD
    }
});

// sending function
const send = function (name, to, subject, message) {
    return new Promise(function(fulfill, reject) {
        let mailOptions = {
            from: SERVER_NAME,
            to: to,
            subject: subject,
            html:
                `<h1 style="text-align:center;border-bottom:solid 1px #99CCFF;">Hello ${name}!<br></h1>
                <p style="text-align:center;"> ${message} </p>
                <p style="text-align:center;">See you soon,<br>NodeJs Task Manager Application.</p>`
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                reject(error);
            } else {
                fulfill(info);
            }
        });
    });
};

function sendMailWrapper(login, priorytyEmail, subject, message) {
    send(login, priorytyEmail, subject, message).then(function (result) {
        makeLog(`Email sent to ${login}`);
    }).catch(function (err) {
        makeLog(`Error during sending an email to ${login}: ${err}`);
    });
}

//send mail to user
exports.sendMailToLogin = function sendMailToLogin(login, subject, message, priorytyEmail) {
    if (priorytyEmail !== undefined) {
        sendMailWrapper(login, priorytyEmail, subject, message);
    } else {
        db.GetUserEmail(login).then(function (email) {
            sendMailWrapper(login, email, subject, message);
        }, () => {
        });
    }
}

// send mail to every board members
exports.sendMailToBoard = function sendMailToBoard(board,owner,subject,message,exception){
    db.GetBoardUsers(board,owner).then(function(users){
        for (let member of users.members) {
            if (member!==exception){
                sendMailToLogin(member,subject,message);
            }
        }
        if (users.owner !== exception) {
            sendMailToLogin(users.owner, subject, message);
        }
    }, ()=>{});
}

//send mail to every task observer
exports.sendMailToTaskObservers = function sendMailToTaskObservers(board,owner,task,subject,message,exception){
    db.GetTaskObservers(board, owner, task).then(function(users){
        for(let user of users) {
            if (user!==exception){
                sendMailToLogin(user,subject,message);
            }
        }
        if (owner!==exception){
            sendMailToLogin(owner,subject,message);
        }
    }, ()=>{});
}