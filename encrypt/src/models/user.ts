import { Schema } from "mongoose";
import { generatePassword } from "../utils/user";
import { Types } from "mongoose";

export interface IUser {
    _id?: Types.ObjectId;
    id?: string;
    email: string;
    password: string;
    salt: string;
    publicKey?: string;
}

export const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
        },
        publicKey: {
            type: String,
        },
    },
    {
        versionKey: false,
    },
);

UserSchema.pre("save", function(next) {
    const doc = this as any;
    if (doc.email && doc.isModified("email")) {
        doc.email = String(doc.email).toLowerCase();
    }
    generatePassword(doc);
    return next();
});
