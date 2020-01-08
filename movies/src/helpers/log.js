const colors = require("colors"),
    fs = require("fs-extra"),
    config = require("../config"),
    LEVELS = Object.freeze({
        no: 9,
        error: 4,
        info: 3,
        debug: 2,
        trace: 1,
    }),
    DEFAULT_LEVEL = LEVELS.debug,
    LOG_PROVIDER = resolveLogProviders(),
    LEVEL = resolveLevel(config.LOG_LEVEL);

function getFileLogger(file) {
    if (!file) {
        return () => {};
    }
    const writeStram = fs.createWriteStream(file, { flags: "w" });
    if (config.LOG_TEMPLATE) {
        writeStram.write(fs.readFileSync(config.LOG_TEMPLATE));
    }
    const logToFile = (...logs) => {
        writeStram.write(`${logs.join(" ")}\n`);
    };
    return logToFile;
}

function resolveLogProviders() {
    const logToFile = getFileLogger(config.LOG_FILE);
    const loggers = [
        (level, color, ...logs) => shouldLog(level) && console.log(colors[color](...logs)),
        (level, color, ...logs) => logToFile(...[`<p style="color: ${color}">`, ...logs, `</p>`]),
    ];
    return (level, color, ...logs) => loggers.forEach(logger => logger(level, color, ...logs));
}

function resolveLevel(key) {
    key = key.toLowerCase();
    if (LEVELS.hasOwnProperty(key)) {
        return LEVELS[key];
    }
    key = Object.keys(LEVELS).filter(k => LEVELS[k] === DEFAULT_LEVEL)[0];
    return DEFAULT_LEVEL;
}

function getDate() {
    const date = new Date();
    return (
        "[" +
        [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-") +
        " " +
        [
            ("0" + date.getHours()).slice(-2),
            ("0" + date.getMinutes()).slice(-2),
            ("0" + date.getSeconds()).slice(-2),
            ("0" + date.getMilliseconds()).slice(-2),
        ].join(":") +
        "]"
    );
}

function logWithProvider(level, color, ...args) {
    return LOG_PROVIDER(
        level,
        color,
        getDate(),
        ...args.map(a => {
            if (typeof a === typeof {}) {
                try {
                    return JSON.stringify(a, null, 2);
                } catch (e) {
                    if (e.name === "TypeError") {
                        return "<CIRCUAL DEPENDENCY ERROR>";
                    }
                    throw e;
                }
            }
            return a;
        }),
    );
}

function shouldLog(level) {
    return LEVEL <= level;
}

function trace(...args) {
    return logWithProvider(LEVELS.trace, "blue", ...args);
}

function debug(...args) {
    return logWithProvider(LEVELS.debug, "green", ...args);
}

function info(...args) {
    return logWithProvider(LEVELS.info, "white", ...args);
}

function warn(...args) {
    return logWithProvider(LEVELS.info, "yellow", ...["WARNING:", ...args]);
}

function error(...args) {
    return logWithProvider(LEVELS.error, "red", ...["ERROR:", ...args]);
}

module.exports = {
    trace,
    debug,
    info,
    warn,
    error,
};
