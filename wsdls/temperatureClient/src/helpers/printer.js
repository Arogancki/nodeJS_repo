const ftc = require('fahrenheit-to-celsius')
    , ctf = require('celsius-to-fahrenheit')

module.exports = {
    f: (n)=>ftc(parseFloat(n)),
    c: (n)=>ctf(parseFloat(n))
}