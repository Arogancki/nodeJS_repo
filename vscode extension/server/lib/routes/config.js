const express = require('express')
const path = require('path')
const fs = require('fs')
const copy = require('copy-object-helper')

const h = require('../helper')
const workingDir = require('../workingDir')

const router = express.Router()
const CONFIGS_FILE = [ 
    "package.json",
    "project.act"
];

function getConfigFile(configFile){
    let curentDir = path.join(workingDir.getPath(), 'src');
    if (!fs.existsSync(curentDir)){
        throw "Src dir not found"
    }
    let files = fs.readdirSync(path.join(curentDir)).filter(
        f=>h.compareIgnoreCase(f, configFile));

    if (files.length === 0){
        throw `Config ${configFile} file not found.`;
    }
    return path.join(curentDir, files[0]);
}

router.post('/', function (req, res) {
    if (error = h.bodyValidation(req)){
        h.sendError(error, 400, req, res);
        return;
    }
    if (!((req.body.identity || {}).appName || "").match(/^\S*$/)){
        h.sendError(`Identity dosen't match the regex /^\S*$/.`, 400, req, res);
        return;   
    }
    try {
        // map app config to files logic
        h.writeJsonFile(getConfigFile(CONFIGS_FILE[0]), {
            identity: {
                appName: req.body.identity.appName
            }
        });
        delete req.body.identity.appName;
        h.writeJsonFile(getConfigFile(CONFIGS_FILE[1]), req.body);
        h.sendOk(req, res);
    }
    catch(e){
        h.sendError(e, 500, req, res);
    }
});

router.get('/', function (req, res) {
    try {
        h.sendOk(req, res, copy.mergeObjects(...CONFIGS_FILE.map(f=>h.readJsonFile(getConfigFile(f)))));
    }
    catch(e){
        h.sendError(e, 500, req, res);
    }
});

function getConfigFileService(configFile){
    let curentDir = path.join(workingDir.getPath());
    if (!fs.existsSync(curentDir)){
        throw "Src dir not found"
    }
    let files = fs.readdirSync(path.join(curentDir)).filter(
        f=>h.compareIgnoreCase(f, configFile));

    if (files.length === 0){
        throw `Config ${configFile} file not found.`;
    }
    return path.join(curentDir, files[0]);
}

router.post('/service', function (req, res) {
    if (error = h.bodyValidation(req)){
        h.sendError(error, 400, req, res);
        return;
    }
    if (!((req.body.identity || {}).appName || "").match(/^\S*$/)){
        h.sendError(`Identity dosen't match the regex /^\S*$/.`, 400, req, res);
        return;   
    }
    try {
        h.writeJsonFile(getConfigFileService("project.act"), req.body);
        h.sendOk(req, res);
    }
    catch(e){
        h.sendError(e, 500, req, res);
    }
});

router.get('/service', function (req, res) {
    try {
        h.sendOk(req, res, h.readJsonFile(getConfigFileService("project.act")));
    }
    catch(e){
        h.sendError(e, 500, req, res);
    }
});

exports.config=router;