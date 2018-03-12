const express = require('express')
const path = require('path')
const fs = require('fs')

const h = require('../helper')
const workingDir = require('../workingDir')

const router = express.Router()
const CONFIG_FILE_NAME = ".AACT";

function getConfigFile(){
    let curentDir = workingDir.getPath();
    let files = fs.readdirSync(curentDir).filter(
        f=>h.compareIgnoreCase(path.extname(f), CONFIG_FILE_NAME));

    if (files.length === 0){
        throw "Config file not found.";
    }
        
    if (files.length > 1){
        throw "Multiple config files found.";
    }
    return path.join(curentDir, files[0]);
}

router.post('/', function (req, res) {
    if (error = h.bodyValidation(req)){
        h.sendError(error, 400, req, res);
        return;
    }
    
    try {
        h.writeJsonFile(getConfigFile(), req.body);
        h.sendOk(req, res);
    }
    catch(e){
        h.sendError(e.message, 500, req, res);
    }
});

router.get('/', function (req, res) {
    let curentDir = workingDir.getPath();
    let files = fs.readdirSync(curentDir).filter(
        f=>h.compareIgnoreCase(path.extname(f), CONFIG_FILE_NAME));

    if (files.length === 0){
        h.sendError("Config file not found.", 500, req, res);
        return;
    }
        
    if (files.length > 1){
        h.sendError("Multiple config files found.", 500, req, res);
        return;
    }

    try {
        h.sendOk(req, res, h.readJsonFile(getConfigFile()));
    }
    catch(e){
        h.sendError(e.message, 500, req, res);
    }
});

exports.config=router;