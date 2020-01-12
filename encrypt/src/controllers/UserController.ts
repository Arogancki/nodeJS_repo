import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import validate from "../utils/validate";
import UserDto from "../dto/UserDto";
import { autobind } from "core-decorators";

interface UserControllerArgs {
    userService: UserService;
}

export default class UserController {
    private readonly userService: UserService;
    constructor(args: UserControllerArgs) {
        this.userService = args.userService;
    }

    @autobind
    public async signIn(req: Request, res: Response, next: NextFunction) {
        await validate(req.body, UserDto);
        return res.json(await this.userService.signIn(req.body));
    }

    @autobind
    public async signUp(req: Request, res: Response, next: NextFunction) {
        await validate(req.body, UserDto);
        return res.json(await this.userService.signUp(req.body));
    }
}
