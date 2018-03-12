const express = require('express')

const { app } = require('./routes/app.js')
const { config }= require('./routes/config.js')
const { path } = require('./routes/path.js')
const { service } = require('./routes/service.js')
const { run } = require('./routes/run.js')

const router = express.Router()

router.use('/path', path);
router.use('/config', config);
router.use('/app', app);
router.use('/service', service);
router.use('/run', run);

exports.router=router;