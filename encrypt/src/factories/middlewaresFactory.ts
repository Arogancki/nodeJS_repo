import { Application } from "express";
import * as bodyParser from "body-parser";
import { cors, helmet, ensureConnection } from "../middlewares";
import winston from "winston";
import expressWinston from "express-winston";

interface ExpressServerFactoryArgs {
    server: Application;
}

export default async function expressServerFactory({ server }: ExpressServerFactoryArgs) {
    server.use(helmet(server));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cors(server));
    server.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            meta: false,
            msg: "HTTP {{req.method}} {{req.url}}",
            expressFormat: true,
            colorize: false,
        }),
    );
    await ensureConnection();
}
