const httpStatuses = require("http-status-codes"),
    log = require("./log");

module.exports = function errorHandler(err, req, res) {
    const status = err.status || httpStatuses.INTERNAL_SERVER_ERROR;
    const message = err.message || JSON.stringify(err);
    res.status(status).send(message);

    return log.error({ status, message });
};
