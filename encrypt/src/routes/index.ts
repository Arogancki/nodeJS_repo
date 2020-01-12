import { notFound } from "../middlewares/notFound";
import { Router } from "express";
import { errorHandler } from "../utils/controller";

interface IndexRouterArgs {
    healthRouter: Router;
    cryptoRouter: Router;
    userRouter: Router;
    authorizationRouter: Router;
}

export default function createIndexRouter({
    healthRouter,
    userRouter,
    cryptoRouter,
    authorizationRouter,
}: IndexRouterArgs) {
    const router = Router();
    router.use("/health", healthRouter);
    router.use("/", userRouter);
    router.use("/", authorizationRouter, cryptoRouter);
    router.use("*", notFound);
    router.use(errorHandler);
    return router;
}
