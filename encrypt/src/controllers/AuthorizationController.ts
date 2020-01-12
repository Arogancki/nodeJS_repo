import { Request, Response, NextFunction } from "express";
import { autobind } from "core-decorators";
import AuthorizationService from "../services/AuthorizationService";
import { IUser } from "../models/user";
import UserFacade from "../facade/UserFacade";

interface AuthorizationControllerArgs {
    authorizationService: AuthorizationService;
}

export type RequestWithUser = Request & { user: UserFacade };

export default class AuthorizationController {
    private readonly authorizationService: AuthorizationService;
    constructor(args: AuthorizationControllerArgs) {
        this.authorizationService = args.authorizationService;
    }

    @autobind
    public async authorize(req: RequestWithUser, res: Response, next: NextFunction) {
        req.user = await this.authorizationService.authorize(req.headers.authorization);
        return next();
    }
}
