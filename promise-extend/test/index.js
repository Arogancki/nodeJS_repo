var rp = require('request-promise');
require('../index.js')(Promise);
/*
Promise.last([rp('http://www.google.com'), rp('http://www.youtube.com'), rp('http://www.facebook.com')]).then(function(result){
    console.log(result);
})
*/
/*
Promise.last([rp('http://www.google.com'), rp('http://www.youtube.com'), rp('http://www.facebook.com'), rp('http://asdadada.com/')]).then(function(result){
    console.log(result);
})
*/

Promise.race([rp('http://google.com/'), rp('http://')]).then(function(result){
    console.log(result);
})