import { NextFunction, Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err) {
        const { statusCode, payload } = err;
        if (statusCode && payload) {
            return res.status(statusCode).json(payload);
        }
        return res.status(500).json(err.message);
    }
}

export function asyncTryCatch(fun: Function) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await fun(req, res, next);
        } catch (err) {
            return next(err);
        }
    };
}
