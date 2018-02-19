//npm install nodemailer
const nodemailer = require('nodemailer');

//email sender data
const SERVER_EMAIL_ADDRESS = 'nodejstaskmanagerapplication@gmail.com';
const SERVER_EMAIL_SERVICE = 'gmail';
const SERVER_EMAIL_PASSWORD = 'Secred_password1';
const SERVER_NAME = 'NodeJS Task manager <nodejstaskmanagerapplication@gmail.com>';

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
            transporter.close();
            if (error) {
                reject(error);
            } else {
                fulfill(info);
            }
        });
    });
}

module.exports = {
    send
};