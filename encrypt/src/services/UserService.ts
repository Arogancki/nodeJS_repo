import UserRepository from "../repositories/userRepository";
import boom from "boom";
import { compareHash } from "../utils/user";
import { generateToken, decodeToken } from "../utils/auth";
import { IUser } from "../models/user";

interface loginUserArgs {
    email: string;
    password: string;
}

interface UserServiceArgs {
    userRepository: UserRepository;
}

export default class UserService {
    private readonly userRepository: UserRepository;
    constructor(args: UserServiceArgs) {
        this.userRepository = args.userRepository;
    }

    async updateUser(id: string, data: Partial<IUser>) {
        return this.userRepository.update(id, data);
    }

    async getUserFromAccessToken(token: string) {
        const data = decodeToken(token) as any;
        if (!data.email) {
            return null;
        }
        return this.userRepository.find(data.email);
    }

    async signIn({ email, password }: loginUserArgs) {
        const user = await this.userRepository.find(email.toLowerCase());
        if (!user) {
            const { output } = boom.notFound("User not found");
            throw output;
        }
        if (!compareHash(password, user)) {
            const { output } = boom.notFound("User not found");
            throw output;
        }
        return generateToken(user);
    }

    async signUp(args: loginUserArgs) {
        try {
            return await this.userRepository.create(args);
        } catch (err) {
            if (err.code === 11000) {
                throw boom.forbidden("Email is already taken");
            }
        }
    }
}
