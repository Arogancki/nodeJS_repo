const fs = require('fs')
const path = require('path')
const copy = require('copy-object-helper')
const tryit = require('tryit');

const SHOW_JSON_OBJECTS_IN_RESPONSE_LOGS = process.env.LOGS || true;	// constant variable if true json objects will be printed in logs after sending response

const X_REQUESTED_WITH = 'app-creator-tool';

const logFile = path.resolve(__dirname, 'avid-App-Creator_tool-log-file.txt');
tryit(()=>fs.unlinkSync(logFile));

function getDate() {
    let date = new Date();
    return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-") + " " + [("0" + date.getHours()).slice(-2), ("0" + date.getMinutes()).slice(-2), ("0" + date.getSeconds()).slice(-2), ("0" + date.getMilliseconds()).slice(-2)].join(':');
}

exports.logger = function logger(req, res, next) {
    makeLog("New request: " + req.method + ":\"" + req.url + "\"", req, res);
    if (SHOW_JSON_OBJECTS_IN_RESPONSE_LOGS && req.method=== "POST")
            makeLog(`body:\n${JSON.stringify(req.body, null, 2)}\n`);
    next();
}

function makeLog(text,req){
    let line;
    if (req)
        line = `${getDate()} > ${req.ip}:${req.socket.localPort} > ${text}`;
    else
        line = `${getDate()} > ${text}`;
    console.log(line);
    fs.appendFileSync(logFile, `${line}\n`); 
}
exports.makeLog = makeLog;

exports.headerChecker = function logger(req, res, next) {
    if (req.headers && req.headers['x-requested-with'] 
        && req.headers['x-requested-with']===X_REQUESTED_WITH){
            next();
            return;
        }
    makeLog("Invalid header x-requested-with", req);
    sendError("Not Found", 404, req, res);
}

exports.allowEveryOrigin = function allowEveryOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
}

function sendOk(req, res, json){
    res.statusCode = 200;
    if (json){
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
        if (SHOW_JSON_OBJECTS_IN_RESPONSE_LOGS)
            makeLog(`Response complete: json:\n${JSON.stringify(json)}\n`, req);
        else
            makeLog("Response complete: json sent", req);
        return;
    }
    res.setHeader('Content-Type', "text/html");
    res.end();
    makeLog("Response complete: 200 sent", req);
};
exports.sendOk = sendOk;

function sendError(message, code, req, res) {
    res.setHeader('Content-Type', "text/html");
    res.statusCode = code;
    res.write(message);
    res.end();
    makeLog(`Error response: ${message} (${code})`,req);
};
exports.sendError = sendError;

exports.bodyValidation = function bodyValidation(req={}, ...requiredProps){
    if (!req.body) return `Missing body.`
    for (let rp of requiredProps){
        let {val: val=rp, type: type=null} = rp
        rp = {val, type}
        if (!req.body[rp.val])
            return `Missing ${rp.val}.`
        if (rp.type && typeof req.body[rp.val] !== rp.type)
            return `${rp.val} type should be ${type}.`
    }
    return null;
}

function writeJsonFile(file, content){
    file = path.resolve(file);
    if(fs.existsSync(file))
        content = copy.mergeObjects(JSON.parse(fs.readFileSync(file, 'utf8')), content);
    return fs.writeFileSync(file, JSON.stringify(content, null, 3));
}
exports.writeJsonFile = writeJsonFile;

function readJsonFile(file){
    file = path.resolve(file);
    if(!fs.existsSync(file))
        throw new Error("File not exist.");
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}
exports.readJsonFile = readJsonFile;

function doesExist(file){
    return fs.existsSync(path.resolve(file));
}
exports.doesExist = doesExist;

function compareIgnoreCase(s1, s2){
    return s1.toUpperCase()===s2.toUpperCase();
}
exports.compareIgnoreCase = compareIgnoreCase;