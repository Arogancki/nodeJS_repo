import { notFound } from "../middlewares/notFound";
import { Router } from "express";

interface IIndexRouterArgs {
    healthRouter: Router;
}

export default function createIndexRouter(routers: IIndexRouterArgs) {
    const router = Router();
    router.use("/health", routers.healthRouter);
    router.use("*", notFound);
    return router;
}
