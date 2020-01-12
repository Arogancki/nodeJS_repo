import { Logger } from "winston";
import { Request, Response, NextFunction, Application } from "express";
import _responseTime from "response-time";

export const responseTime = (server: Application, logger: Logger) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    server.use(_responseTime(responseTimeLogger(logger)));
    return next();
};

const responseTimeLogger = (logger: Logger) => (req: Request, res: Response, time: number) => {
    logger.debug(`Completed ${req.method} ${req.originalUrl} in ${time.toFixed(4)}ms`);
};
