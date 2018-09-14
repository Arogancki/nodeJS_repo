let x1 = require('./first')
let x2 = require('./second')

console.log(`x1 to ${x1}\nx2 to ${x2}`)
x1.test = "nie jestem z konstruktora"
console.log(`x1 to ${x1}\nx2 to ${x2}`)