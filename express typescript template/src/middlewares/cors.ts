import { Request, Response, NextFunction, Application } from "express";
import _cors from "cors";

export function cors(app: Application) {
    return (req: Request, res: Response, next: NextFunction) => {
        app.use(_cors());
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.sendStatus(200);
        }
        return next();
    };
}
