const dotenv = require("dotenv"),
    fs = require("fs-extra"),
    requirements = require("./config"),
    criticalError = require("../helpers/criticalError");

let config = null;

function init() {
    const configBuilder = {};

    function validateEnvVar(key, value) {
        if (configBuilder.hasOwnProperty(key)) {
            criticalError(`Environment variable ${key} has been already set`);
        }

        const parser = requirements.parsers[key];
        const parsedValue = typeof parser === typeof (() => {}) ? parser(value) : value;
        const validator = requirements.validators[key];
        const error = typeof validator === typeof (() => {}) && requirements.validators[key](parsedValue);
        error && criticalError(`Invalid ${key}`, error);
        configBuilder[key] = parsedValue;
    }

    const initialNodeEnv = process.env.NODE_ENV;
    dotenv.config();
    if (initialNodeEnv) {
        process.env.NODE_ENV = initialNodeEnv;
    }

    if (!process.env.hasOwnProperty("NODE_ENV")) {
        criticalError(`Required environment variable NODE_ENV is not set`);
    }

    const envSpecificConfigFilePath = "./.env_" + process.env.NODE_ENV;
    if (fs.existsSync(envSpecificConfigFilePath)) {
        dotenv.config({
            path: envSpecificConfigFilePath,
        });
    }

    requirements.required.forEach(requiredEnvKey => {
        if (!process.env.hasOwnProperty(requiredEnvKey)) {
            criticalError(`Required environment variable ${requiredEnvKey} is not set`);
        }
        validateEnvVar(requiredEnvKey, process.env[requiredEnvKey]);
    });

    Object.keys(requirements.optional).forEach(optionalEnvKey => {
        validateEnvVar(optionalEnvKey, process.env[optionalEnvKey] || requirements.optional[optionalEnvKey]);
    });

    config = new Proxy(configBuilder, {
        get(target, k) {
            if (!target.hasOwnProperty(k)) {
                criticalError(`Config variable ${k} is not set`);
            }
            return target[k];
        },
        set(target, k) {
            criticalError(`cannot set config variables`);
        },
        deleteProperty(target, k) {
            criticalError(`cannot delete config variables`);
        },
    });

    return config;
}

module.exports = config || init();
