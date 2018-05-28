const express = require('express')

const { app } = require('./routes/app')
const { config }= require('./routes/config')
const { path } = require('./routes/path')
const { service } = require('./routes/service')
const { openWorkspace } = require('./routes/openWorkspace')

const router = express.Router()

router.use('/path', path);
router.use('/config', config);
router.use('/app', app);
router.use('/service', service);
router.use('/openWorkspace', openWorkspace);

exports.router=router;