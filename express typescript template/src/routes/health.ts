import { Router } from "express";
import HealthController from "../controllers/HealthController";

interface IHealthRouterArgs {
    healthController: HealthController;
}

export default function createHealthRouter(services: IHealthRouterArgs) {
    const healthRouter = Router();

    healthRouter.get("/", services.healthController.reportHealthStats);

    return healthRouter;
}
