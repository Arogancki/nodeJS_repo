const geolang=require("geolang-express")

module.exports = geolang({
    siteLangs: ["en","pl"],
    cookieLangName: 'clang'
})