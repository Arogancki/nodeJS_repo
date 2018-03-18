const httpStatus = require('http-status-codes')

    , { log } = require('./log')

function send(req, res, status=200, payload){
    res.status(status);
    res.send(payload || httpStatus.getStatusText(status));
    log(`Response: ${status} ${res._headers['content-type'].split(';')[0]}`, req, payload);
};
module.exports = send;