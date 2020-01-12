import { Router } from "express";
import UserController from "../controllers/UserController";
import { asyncTryCatch } from "../utils/controller";

interface CreateUserRouterArgs {
    userController: UserController;
}

export default function createUserRouter(controllers: CreateUserRouterArgs) {
    const router = Router();

    router.post("/sign-in", asyncTryCatch(controllers.userController.signIn));
    router.post("/sign-up", asyncTryCatch(controllers.userController.signUp));

    return router;
}
