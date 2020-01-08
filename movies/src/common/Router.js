const express = require("express"),
    errorHandler = require("../helpers/errorHandler");

async function runValidation(fun, req, res) {
    if (typeof fun === typeof (() => {})) {
        return fun(req, res);
    }
    if (typeof fun === typeof []) {
        for (f of fun) {
            const err = await f(req, res);
            if (err) {
                return err;
            }
        }
    }
}

function validateParams(validators) {
    return async function validate(req, res, next) {
        const validationError = validators && (await runValidation(validators, req, res));
        if (validationError) {
            req.logger(`Validation error ${validationError.join ? validationError.join(", ") : validationError}`);

            return res.status(400).json(validationError);
        }

        return next();
    };
}

function checkPolicies(policies) {
    return async function checkPolicies(req, res, next) {
        const accessError = policies && (await runValidation(policies, req, res));
        if (accessError) {
            req.logger(`Access error ${accessError}`);

            return res.sendStatus(accessError);
        }

        return next();
    };
}

module.exports = class Router extends express.Router {
    constructor(routesConfig = [], innerRouters = []) {
        super();

        routesConfig.forEach(routeConfig => {
            routeConfig.method = routeConfig.method || "all";
            routeConfig.route = routeConfig.route || "/";

            return this[routeConfig.method](
                routeConfig.route,
                checkPolicies(routeConfig.policy),
                validateParams(routeConfig.validation),
                async (req, res) => {
                    try {
                        res.json(await routeConfig.handler(req, res));
                        return req.logger(`response 200`);
                    } catch (err) {
                        return errorHandler(err, req, res);
                    }
                },
            );
        });

        innerRouters.forEach(route => {
            this.use(route.path, route.router);
        });
    }
};
