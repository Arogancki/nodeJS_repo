import { pbkdf2Sync, randomBytes } from "crypto";
import { IUser } from "../models/user";

export function generatePassword(doc: any) {
    if (doc.password && doc.isModified("password")) {
        doc.salt = generateSalt(16);
        doc.password = hashPassword(doc.password, doc.salt);
    }
}

export function generateSalt(length: number, encoding: string = "base64") {
    return randomBytes(length).toString(encoding);
}

function hashPassword(password: string, salt: string) {
    return pbkdf2Sync(
        password,
        new Buffer(salt + process.env.SALT, "base64"),
        10000,
        64,
        "sha512WithRSAEncryption",
    ).toString("base64");
}

export function compareHash(testPassword: string, user: IUser) {
    return hashPassword(testPassword, user.salt) === user.password;
}
