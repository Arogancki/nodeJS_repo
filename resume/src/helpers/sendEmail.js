const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Yahoo", // no need to set host or port etc.
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD
    }
})

module.exports = function sendEmail(subject, text, contact) {
    return new Promise((res, rej)=>{
        text = contact ? `${text}\nContact: ${contact}` : text
        return transporter.sendMail({
            from: `"Artur Ziemba - developer's resume" <${process.env.EMAIL_LOGIN}>`,
            to: process.env.CONTACT_EMAIL,
            subject: subject,
            text: contact ? `${text}\nContact: ${contact}` : text,
        }, (err, info)=>{
            if (err){
                err.stack = `Email not send:\nsubject: ${subject}\ntext: ${text}\n${err.stack}`
                return rej(err)
            }
            return res(info)
        })
    })
}