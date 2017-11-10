const bodyParser = require('body-parser');
const app = require('express')()
const cryptoRandomString = require('crypto-random-string')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var port = 8060
var url = `http://localhost:${port}`

var tokensDB = {}

var userDB = {
    Artur: {password: "pass"}
}

app.get('/getLoginAdress', (req, res) => {
    let loginToken = cryptoRandomString(20)
    tokensDB[loginToken] = {logged: false}
    let response = {
        url: `${url}/login/${loginToken}`,
        token: loginToken
    }
    res.send(response);
})

app.get('/login/*', (req, res) => {
    let loginToken = req.params[0]
    if (tokensDB.hasOwnProperty(loginToken)){
        res.sendFile(__dirname + '/public/login.htm')
    }else{
        res.sendFile(__dirname + '/public/error.htm')
    }
})

app.post('/login/auth.htm', (req, res) => {
    let token = req.body.token.split("/")[2];
    if (userDB.hasOwnProperty(req.body.login) && userDB[req.body.login].password == req.body.password){
        if (tokensDB.hasOwnProperty(token)){
            tokensDB[token].logged = true
            tokensDB[token].login = req.body.login
            res.sendFile(__dirname + '/public/index.htm')
        }else{
            res.sendFile(__dirname + '/public/error.htm')
        }
    }else{
        delete tokensDB[token]
        res.sendFile(__dirname + '/public/error2.htm')
    }
})

app.post('/isLogged', (req, res) => {
    var msg = {}
    if (tokensDB.hasOwnProperty(req.body.token)){
        if (tokensDB[req.body.token].logged == true){
            msg.status = 'yes'
            msg.login = tokensDB[req.body.token].login
            delete tokensDB[req.body.token]
        }else{
            msg.status = 'no'
        }
    }else{
        msg.status = 'err'
    }
    res.send(msg)
})

app.listen(port, () => console.log('Server\'s on: '+ url))