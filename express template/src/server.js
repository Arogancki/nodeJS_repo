const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , portfinder = require('portfinder')
    , passport = require('passport')
    , path = require('path')

    , helmetConfig = require('./helmetConfig')
    , {log, logger} = require('./log')
    , router = require('./router')
    , send = require('./send')

    , app = express()
    , sess = {
        secret: process.env.SECRET || `secret`,
        proxy: true,
        
        resave: true,
        saveUninitialized: true
    };

app.use(helmetConfig(app));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger);

app.use('/', router);
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
    return server = app.listen(app.get('port'), "127.0.0.1", function () {
        const address = server.address();
        log(`Server is listening on ${address.address}:${address.port}`);
    });
}