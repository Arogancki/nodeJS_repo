// README!!! 
//
// DOESNT WORK ON DEBUG 
// Starting inspector on 127.0.0.1:8346 failed: address already in use

const express = require('express')
const fork = require('child_process').fork;
const fs = require('fs-extra')
const path = require('path')

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
    if (!fs.existsSync(body.path)) {
        h.sendError("Path does not exist.", 400, req, res);
        return;
    }
    if (fs.existsSync(path.join(body.path, body.name))) {
        h.sendError("Project already exists.", 400, req, res);
        return;
    }
    let args = [
        `--name=${body.name}`, 
        `--description=${body.description}`, 
        `--path=${body.path}`, '--projectChoice=core', 
        `--hostIp=${body.hostPort || 'localhost'}`,
        `--hostPort=${body.osgiIp || '8443'}`
    ];
    body.osgiPort && args.push(`--osgiPort=${body.osgiPort}`);

    let process = fork(require.resolve('cloudux-starter-kit'), args);
    process.on('exit', (out)=>{
        let newProjectPath = path.join(body.path, body.name);
        try {
            fs.copySync(path.join(__dirname, 'launch.json'), path.join(newProjectPath, '.vscode', 'launch.json'));
            h.sendOk(req, res);
        }
        catch(err){
            fs.removeSync(newProjectPath);
            h.sendError(err.message, 500, req, res);
        }
    });
    process.on('error', err=>{
        h.sendError(err.message, 500, req, res);
    });
})
exports.app=router;