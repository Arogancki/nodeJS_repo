const i18n = require("i18n-express")
    , path = require('path')

// /?clang=en|pl to change

module.exports = i18n({
    translationsPath: path.join(__dirname, '..', 'i18n'),
    siteLangs: ["en","pl"],
    textsVarName: 'translation',
    cookieLangName: 'clang'
})