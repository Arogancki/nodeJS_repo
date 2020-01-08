const httpStatus = require("http-status-codes"),
    Router = require("../common/Router"),
    log = require("../helpers/log"),
    errorHandler = require("../helpers/errorHandler");

module.exports = (app, routers) => {
    const router = new Router([], routers);

    router.use(function notFoundHandler(req, res, next) {
        res.sendStatus(httpStatus.NOT_FOUND);
        return log.debug(`${httpStatus.NOT_FOUND} sent`);
    });

    router.use(errorHandler);

    app.use(router);
};
