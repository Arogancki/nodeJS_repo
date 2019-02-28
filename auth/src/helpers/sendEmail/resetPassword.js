const fs = require('fs-extra')
    , config = require('../../config')
    , sendEmail = require('.')
    , html = fs.readFileSync(config.RESET_PASSWORD_TEMPLATE_EMAIL, 'utf8')
        .replace(/%signature%/g, config.SIGNATURE)

const getResetPasswordHTML = link => html.replace(/%link%/g, link)

module.exports = (to, link) => sendEmail(to, 'Reset your password', getResetPasswordHTML(link))