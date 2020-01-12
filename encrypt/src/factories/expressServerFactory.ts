import { Logger } from "winston";
import express, { Router } from "express";
import { Application } from "express";
import middlewaresFactory from "./middlewaresFactory";
import { asValue } from "awilix";
import { DependencyContainer } from "../utils/dependency";

interface ExpressServerFactoryArgs {
    indexRouter: Router;
    logger: Logger;
}

export default async function expressServerFactory({ logger, indexRouter }: ExpressServerFactoryArgs) {
    const server = express();

    const port = process.env.SERVER_PORT || 3000;

    const dependencyContainer = DependencyContainer.getInstance();
    dependencyContainer.register<Application>("server", asValue(server));

    await middlewaresFactory(dependencyContainer.cradle);

    return new Promise(resolve => {
        server.listen(port, () => {
            logger.info(`Express server has started on port ${port}`);
            server.use("/api/", indexRouter);
            resolve(server);
        });
    });
}
