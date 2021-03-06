const httpStatus = require('http-status-codes')

    , { log } = require('./log')

function send(req, res, status=200, payload){
    res.status(status);
    res.send(payload || httpStatus.getStatusText(status));
    res.end();
    log(`Response: ${status}`, req, payload);
};
module.exports = send;