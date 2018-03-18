const express = require('express')
    , fs = require('fs')
    , path = require('path')

    , router = express.Router()

fs.readdirSync(path.join(__dirname, 'routes'))
    .map(v=>Object({
        path: `/${v}`,
        router: require(path.join(__dirname, 'routes', v))
    }))
    .map(v=>router.use(v.path, v.router))

module.exports = router;
