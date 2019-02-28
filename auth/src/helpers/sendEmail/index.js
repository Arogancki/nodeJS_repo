const nodemailer = require('nodemailer')
    , config = require('../../config')

const transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    auth: {
        user: config.EMAIL_LOGIN,
        pass: config.EMAIL_PASSWORD
    }
})

module.exports = function sendEmail(to, subject, html) {
    return new Promise((res, rej)=>{
        return transporter.sendMail({
            from: `"${config.SIGNATURE}" <${config.EMAIL_LOGIN}>`,
            to, subject, html,
        }, (err, info)=>{
            if (err){
                err.stack = `Email not send:\nsubject: ${subject}\nto: ${to}\n${err.stack}`
                return rej(err)
            }
            return res(info)
        })
    })
}
