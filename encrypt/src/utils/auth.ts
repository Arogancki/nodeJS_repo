import jwt from "jsonwebtoken";
import { IUser } from "../models/user";
import { config } from "dotenv";

config();

export function generateToken(user: IUser) {
    const { JWT_SECRET_KEY, JWT_EXPIRATION_TIME } = process.env;
    return {
        accessToken: jwt.sign(
            {
                email: user.email,
            },
            String(JWT_SECRET_KEY),
            {
                expiresIn: Number(JWT_EXPIRATION_TIME),
            },
        ),
    };
}

export function decodeToken(token: string) {
    const { JWT_SECRET_KEY } = process.env;
    return jwt.verify(token, String(JWT_SECRET_KEY));
}
