const express = require('express')
const child = require('child_process')
const path = require('path');

const h = require('../helper')

const router = express.Router()

router.post('/', function (req, res) {
    if (error = h.bodyValidation(req, {
        val: 'path',
        type: 'string'
    }, {
        val: 'appName',
        type: 'string'
    })){
        h.sendError(error, 400, req, res);
        return;
    }
    let dir = path.join(req.body.path, req.body.appName);
    if (!h.doesExist(dir)){
        h.sendError(`Path does not exist: ${dir}`, 400, req, res);
        return;
    }
    child.exec((/^win/.test(process.platform) ? 'code.cmd' : 'code') + ` -r ${dir}`, (err, stdout, stderr)=>{
        if (err){
            h.sendError('Cannot reopen window. Add "code" to path', 400, req, res);
            return;
        }
        h.sendOk(req, res, {stdout, stderr});
    })
})

exports.openWorkspace=router;