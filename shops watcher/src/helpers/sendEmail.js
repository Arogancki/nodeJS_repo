const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Yahoo",
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD
    }
})

module.exports = function sendEmail(subject, html) {
    return new Promise((res, rej)=>
    // res())
    transporter.sendMail({
        from: `"Watcher" <${process.env.EMAIL_LOGIN}>`,
        to: process.env.CONTACT_EMAIL,
        subject: subject,
        html: html
    }, (err, info)=>err ? rej(err) : res(info)))
}