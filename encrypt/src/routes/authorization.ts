import { Router } from "express";
import AuthorizationController from "../controllers/AuthorizationController";
import { asyncTryCatch } from "../utils/controller";

interface createCryptoRouterArgs {
    authorizationController: AuthorizationController;
}

export default function createCryptoRouter(controllers: createCryptoRouterArgs) {
    const router = Router();

    router.use("/", asyncTryCatch(controllers.authorizationController.authorize));

    return router;
}
