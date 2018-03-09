const express = require('express')
const path = require('path')

const h = require('../helper')
const globals = require('../globals')

const router = express.Router()
const CONFIG_FILE_NAME = ".AACT";

router.post('/config', function (req, res) {
    if (error = h.bodyValidation(req)){
        h.sendError(error, 400, req, res);
        return;
    }
    let configFilePath = path.resolve(path.join(globals.getPath(), CONFIG_FILE_NAME));
    if (!doesExist(configFilePath)){
        h.sendError(`File ${configFilePath} does not exist.`, 400, req, res);
        return;
    }
    try {
        h.writeJsonFile(configFilePath, req.body);
        h.sendOk(req, res);
    }
    catch(e){
        h.sendError(e.message, 500, req, res);
    }
});

router.get('/config', function (req, res) {
    let configFilePath = path.resolve(path.join(globals.getPath(), CONFIG_FILE_NAME));
    if (!doesExist(configFilePath)){
        h.sendError(`File ${configFilePath} does not exist.`, 400, req, res);
        return;
    }
    try {
        h.sendOk(req, res, h.readJsonFile(configFilePath));
    }
    catch(e){
        h.sendError(e.message, 500, req, res);
    }
});

exports.config=router;