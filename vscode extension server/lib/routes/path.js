const express = require('express')
//const appStarterKit = require('cloudux-starter-kit')

const h = require('../helper')
const globals = require('../globals')

const router = express.Router()

router.get('/path', function (req, res) {
    h.sendOk(req, res, globals.getPath());
})

router.post('/path', function (req, res) {
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
    globals.setPath(req.body.path);
    h.sendOk(req, res);
})

exports.path=router;