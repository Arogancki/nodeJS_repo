const nodemailer = require('nodemailer')

if (process.env.EMAIL_SERVICE==false){
    throw new Error('EMAIL_SERVICE is not provided')
}
if (process.env.EMAIL_LOGIN==false){
    throw new Error('EMAIL_LOGIN is not provided')
}
if (process.env.EMAIL_PASSWORD==false){
    throw new Error('EMAIL_PASSWORD is not provided')
}
if (process.env.CONTACT_EMAIL==false){
    throw new Error('CONTACT_EMAIL is not provided')
}

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD
    }
})

module.exports = function sendEmail(subject, text, contact) {
    return new Promise((res, rej)=>{
        if (process.env.EMAILS !== 'true')
            return setTimeout(res, 1000)
        text = contact ? `${text}\nContact: ${contact}` : text
        return transporter.sendMail({
            from: `"Artur Ziemba - developer's resume" <${process.env.EMAIL_LOGIN}>`,
            to: process.env.CONTACT_EMAIL,
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