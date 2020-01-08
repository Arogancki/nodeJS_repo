const httpStatuses = require("http-status-codes");

module.exports = class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = httpStatuses.NOT_FOUND;
    }
};
