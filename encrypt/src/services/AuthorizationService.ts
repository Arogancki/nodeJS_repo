import boom from "boom";
import UserService from "./userService";

interface AuthorizationServiceArgs {
    userService: UserService;
}

export default class AuthorizationService {
    private readonly userService: UserService;
    constructor(args: AuthorizationServiceArgs) {
        this.userService = args.userService;
    }

    async authorize(token?: string) {
        if (token) {
            try {
                const user = await this.userService.getUserFromAccessToken(token);
                if (user) {
                    return user;
                }
            } catch (err) {}
        }
        const { output } = boom.resourceGone("Invalid token");
        throw output;
    }
}
