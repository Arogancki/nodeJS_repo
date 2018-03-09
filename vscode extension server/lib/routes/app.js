const express = require('express')
//const appStarterKit = require('cloudux-starter-kit')

const h = require('../helper')

const router = express.Router()

router.post('/app', function (req, res) {
    h.sendError("Not Implemented", 501, req, res);
})

exports.app=router;