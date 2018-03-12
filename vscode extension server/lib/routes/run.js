const express = require('express')
const child = require('child_process')

const h = require('../helper')

const router = express.Router()
let process = null;

router.post('/', function (req, res) {
    if (error = h.bodyValidation(req, {
        val: 'command',
        type: 'string'
    })){
        h.sendError(error, 400, req, res);
        return;
    }
    if (process){
        h.sendError("Service Unavailable", 503, req, res);
        return;
    }
    process = child.exec(req.body.command, (err, stdout, stderr)=>{
        process = null;
        if (err){
            h.sendError(err, 400, req, res);
            return;
        }
        h.sendOk(req, res, {stdout, stderr});
    })
})

router.delete('/', function (req, res) {
    if (!process){
        h.sendError("Process not running", 400, req, res);
        return;
    }
    process.kill();
    h.sendOk(req, res);
})

exports.run=router;