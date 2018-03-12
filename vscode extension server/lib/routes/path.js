const express = require('express')
//const appStarterKit = require('cloudux-starter-kit')

const h = require('../helper')
const workingDir = require('../workingDir')

const router = express.Router()

router.get('/', function (req, res) {
    h.sendOk(req, res, {path: workingDir.getPath()});
})

router.post('/', function (req, res) {
    if (error = h.bodyValidation(req, {
        val: 'path',
        type: 'string'
    })){
        h.sendError(error, 400, req, res);
        return;
    }
    if (!h.doesExist(req.body.path)){
        h.sendError(`Path does not exist: ${req.body.path}`, 400, req, res);
        return;
    }
    workingDir.setPath(req.body.path);
    h.sendOk(req, res);
})

exports.path=router;