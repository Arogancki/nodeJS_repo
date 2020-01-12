import { Request, Response, NextFunction, Application } from "express";
import _helmet from "helmet";

export const helmet = (app: Application) =>
    function helmet(req: Request, res: Response, next: NextFunction) {
        app.use(_helmet());
        app.disable(`x-powered-by`);
        app.set(`trust proxy`, 1);
        next();
    };
