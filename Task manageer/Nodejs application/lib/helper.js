const SHOW_JSON_OBJECTS_IN_RESPONSE_LOGS = process.env.LOGS || true;	// constant variable if true json objects will be printed in logs after sending response

const db = require('./db')()

// get Date for logs
function getDate() {
    let date = new Date();
    return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-") + " " + [("0" + date.getHours()).slice(-2), ("0" + date.getMinutes()).slice(-2), ("0" + date.getSeconds()).slice(-2), ("0" + date.getMilliseconds()).slice(-2)].join(':');
}

exports.getIndexLink = function getIndexLink(message)
{   if (SHOW_JSON_OBJECTS_IN_RESPONSE_LOGS && message)
        makeLog(`getIndexLink: ${message}`);
    return `/`
}

exports.logger = function logger(req, res, next) {
    makeLog("New request: " + req.method + ":\"" + req.url + "\"", req, res);
    next();
}

// same format logs
function makeLog(text,req){
    if (req!==undefined)
        console.log(`${getDate()} > ${req.ip} > ${text}`);
    else
        console.log(`${getDate()} > ${text}`);
}
exports.makeLog = makeLog;

// check if there are mongo forbidden characters
exports.isMongoInjectionsFree = function isMongoInjectionsFree(text) {
    return /^[^\/\\"$*<>:|?]*$/g.test(text);
}

// check if text is ok
function textValidation(text, min = 0, max = Infinity) {
    return (text !== undefined) && (/^[a-zA-Z0-9._-]+$/).test(text) && text.length >= min && text.length <= max;
}
exports.textValidation = textValidation;

// check if email is ok
exports.emailValidation = function emailValidation(text, min = 0, max = Infinity) {
    return (text !== undefined) && (/^[^\/\\'"@\s]+@[^\/\\'"@\s]+$/).test(text) && text.length >= min && text.length <= max;
}

// send "check login and password"
function userValidation(body) {
    return new Promise(function(fulfill, reject) {
        if (!textValidation(body.login, 3, 20) || !textValidation(body.password, 3, 20)) {
            reject("Invalind login or password");
            return;
        }
        db.Authorization(body.login, body.password).then(function (authentication) {
            fulfill(authentication);
        }, reject);
    });
}
exports.userValidation = userValidation;

function userCorretionAndValidation(req, res){
    return new Promise(function(resolve, reject){
        db.GetRealName(req.body.login).then(function(realLogin){
            req.body.login = realLogin;
            userValidation(req.body).then(resolve, reject);
        }, reject);
    });
}
exports.userCorretionAndValidation = userCorretionAndValidation;

// send error message
exports.sendError = function sendError(message, code, req, res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = code;
    res.write(message);
    res.end();
    makeLog("Error response: "+message,req);
}

// send "json file" or empty response
exports.sendOk = function sendOk(req, res, json){
    res.statusCode = 200;
    if (json===undefined){
        res.setHeader('Content-Type', "text/html");
        res.end();
        makeLog("Response complete: confirmation sent",req);
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(json);
    if (SHOW_JSON_OBJECTS_IN_RESPONSE_LOGS)
        makeLog("Response complete: json object:\n"+json+"\n",req);
    else
        makeLog("Response complete: json object sent",req);
}