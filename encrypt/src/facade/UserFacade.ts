import { IUser } from "../models/user";
export default class UserFacade implements IUser {
    id!: string;
    email!: string;
    password!: string;
    salt!: string;
    publicKey?: string;
    constructor(user: IUser) {
        const { _id, ...rest } = user;
        Object.assign(this, { id: String(user._id), ...rest });
    }
}
