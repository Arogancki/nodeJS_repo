const nodemailer = require('nodemailer')
    , config = require('../config')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.EMAIL_LOGIN,
        pass: config.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = function sendEmail(subject, text, contact) {
    return new Promise((res, rej)=>{
        if (config.EMAILS !== true){
            return res()
        }
        text = contact ? `${text}\nContact: ${contact}` : text
        return transporter.sendMail({
            from: `"Artur Ziemba - developer's resume" <${config.EMAIL_LOGIN}>`,
            to: config.CONTACT_EMAIL,
            subject: subject,
            text: text,
        }, (err, info)=>{
            if (err){
                err.stack = `Email not send:\nsubject: ${subject}\ntext: ${text}\n${err.stack}`
                return rej(err)
            }
            return res(info)
        })
    })
}