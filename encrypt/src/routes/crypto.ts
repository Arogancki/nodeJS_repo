import { Router } from "express";
import { asyncTryCatch } from "../utils/controller";
import CryptoController from "../controllers/CryptoController";

interface createCryptoRouterArgs {
    cryptoController: CryptoController;
}

export default function createCryptoRouter(controllers: createCryptoRouterArgs) {
    const router = Router();

    router.post("/generate-key-pair", asyncTryCatch(controllers.cryptoController.generateKeyPair));
    router.post("/encrypt", asyncTryCatch(controllers.cryptoController.encrypt));
    router.post("/decrypt", asyncTryCatch(controllers.cryptoController.decrypt));

    return router;
}
