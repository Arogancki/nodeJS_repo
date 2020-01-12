import { createLogger, format, transports } from "winston";
const { combine, timestamp, colorize, printf } = format;
const logFormat = printf(log => `${log.timestamp} ${log.level}: ${log.message}`);

export default function loggerFactory() {
    return createLogger({
        level: process.env.LOGGER_LEVEL || "debug",
        format: combine(colorize(), timestamp(), logFormat),
        transports: [new transports.Console()],
    });
}
