const express = require('express')
const fs = require('fs-extra')
const path = require('path')
const serviceStarterKit = require('mediacentral-service-starter-kit-nodejs/mediacentral-service-starter-kit-nodejs.js')

const h = require('../../helper')
const workingDir = require('../../workingDir')

const router = express.Router()

router.use('/', function (req, res) {
    if (error = h.bodyValidation(req, {
        val: 'name',
        type: 'string'
    }, {
        val: 'description',
        type: 'string'
    })){
        h.sendError(error, 400, req, res);
        return;
    }
    let { body } = req
    !body.path && (body.path = workingDir.getPath());
    if (!fs.existsSync(body.path)){
        h.sendError("Destination does not exist.", 400, req, res);
        return;
    }
    if (fs.existsSync(path.join(body.path, body.name))){
        h.sendError("Project already exists.", 400, req, res);
        return;
    }
    serviceStarterKit([`--name=${body.name}`, `--description=${body.description}`, 
    `--path=${body.path}`, `--version=${1}`, `--host=${''}`]);
    let newProjectPath = path.join(body.path, body.name);
    try {
        fs.copySync(path.join(__dirname, 'launch.json'), path.join(newProjectPath, '.vscode', 'launch.json'));
        h.sendOk(req, res);
    }
    catch(err){
        fs.removeSync(newProjectPath);
        h.sendError(err.message, 500, req, res);
    }
})

exports.service=router;