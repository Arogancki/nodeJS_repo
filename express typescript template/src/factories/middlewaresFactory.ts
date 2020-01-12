import { Application } from "express";
import * as bodyParser from "body-parser";
import { cors, helmet, ensureConnection, responseTime } from "../middlewares";
import { Logger } from "winston";

interface ExpressServerFactoryArgs {
    logger: Logger;
    server: Application;
}

export default async function expressServerFactory({ logger, server }: ExpressServerFactoryArgs) {
    server.use(helmet(server));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cors(server));
    server.use(responseTime(server, logger));
    await ensureConnection();
}
