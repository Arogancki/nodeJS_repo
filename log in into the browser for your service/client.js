const opn = require('opn')
const request = require('request')

var serverUrl = `http://localhost:8060`

var checkSigning = function(token) {
    request.post(`${serverUrl}/isLogged`, { json: {token: token} }, function (err, res, body) {
        if (body.status == 'yes'){
            console.log(`Hello ${body.login}!!`)
        }else if (body.status == 'no'){
            setTimeout(function(){
                checkSigning(token)
            }, 1000)
        }else{
            console.log(`Signing failed`)
        }
    })
}

request(`${serverUrl}/getLoginAdress` , (err, res, body) => {
    body = JSON.parse(body)
    opn(body.url)
    let token = body.token
    checkSigning(token)
})