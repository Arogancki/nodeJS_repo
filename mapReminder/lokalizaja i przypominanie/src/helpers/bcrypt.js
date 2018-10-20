const bcrypt = require('bcrypt-nodejs')

module.exports = {
    encode: password=>new Promise((res, rej)=>bcrypt.genSalt(8, (err, salt)=>!err ? res(salt) : rej(err)))
        .then(salt=>new Promise((res, rej)=>bcrypt.hash(password, salt, null, (err, hash)=>!err ? res(hash) : rej(err)))),
    compare: (password, hash)=>new Promise((res, rej)=>bcrypt.compare(password, hash, (err, comp)=>!err ? res(comp) : rej(err)))
}