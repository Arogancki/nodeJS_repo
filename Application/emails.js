//npm install nodemailer
var nodemailer = require('nodemailer');

var SERVER_EMAIL_ADDRESS = 'nodejstaskmenagerapplication@gmail.com';
var SERVER_EMAIL_SERVICE = 'gmail';
var SERVER_EMAIL_PASSWORD = 'Secred_password1';
var SERVER_NAME = 'NodeJS Task Menager <nodejstaskmenagerapplication@gmail.com>';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var transporter = nodemailer.createTransport({
  service: SERVER_EMAIL_SERVICE,
  auth: {
    user: SERVER_EMAIL_ADDRESS,
    pass: SERVER_EMAIL_PASSWORD
  }
});

function GetHeader(name) {
    return '<h1 style="text-align:center;border-bottom:solid 1px #99CCFF;">Hello ' + name + '!<br></h1>';
}

var EMAIL_FOOTER = '<p style="text-align:center;">See you soon,<br>NodeJs Task Menager Application.</p>';

var send = function (name, to, subject, message) {
    return new Promise(function(fulfill, reject) {
        var mailOptions = {
            from: SERVER_NAME,
            to: to,
            subject: subject,
            html: GetHeader(name) + '<p style="text-align:center;">' + message + '</p>' + EMAIL_FOOTER
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                reject(error);
            } else {
                fulfill(true);
            }
        });
        transporter.close();
    });
}

module.exports = {
    send
};