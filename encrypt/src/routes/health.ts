import { Router } from "express";
import HealthController from "../controllers/HealthController";

interface HealthRouterArgs {
    healthController: HealthController;
}

export default function createHealthRouter(controllers: HealthRouterArgs) {
    const router = Router();

    router.get("/", controllers.healthController.reportHealthStats);

    return router;
}
