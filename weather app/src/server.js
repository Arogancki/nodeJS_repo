const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , portfinder = require('portfinder')
    , path = require('path')
    , mongoose = require('mongoose')
    , http = require('http')
    , flash = require('connect-flash')

    , passport = require('./configs/passportConfig')
        (require('passport'))
    , helmetConfig = require('./configs/helmetConfig')
    , {log, logger} = require('./log')
    , router = require('./router')
    , send = require('./send')
    , sess = require('./configs/sessionConfig')

    , app = express()

mongoose.Promise = Promise;  
mongoose.connect(process.env.MONGO);
app.use(helmetConfig(app));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash())
app.use(logger);

app.use('/', router(passport));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    send(req, res, 404);
});

app.use(function(err, req, res, next) {
    send(req, res, 500, 
        process.env.ENV === 'dev' 
        ? err.message 
        : undefined
    );
});

module.exports = async ()=>{
    app.set('port', parseInt(process.env.PORT, 10) || await portfinder.getPortPromise());
    return server = http.createServer(app).listen(app.get('port'), "127.0.0.1", function () {
        const address = server.address();
        log(`Server is listening on ${address.address}:${address.port}`);
    });
}