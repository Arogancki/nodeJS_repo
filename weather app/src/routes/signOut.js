const router = require('express').Router()
    , redirect = require('../redirect')

module.exports=(passport)=>{    
    router.get('/', function(req, res) {
        req.logout();
        redirect(req, res, '/');
    });
    return router;
};