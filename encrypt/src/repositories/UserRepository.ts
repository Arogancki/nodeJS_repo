import mongoose from "mongoose";
import { UserSchema, IUser } from "../models/user";
import UserFacade from "../facade/UserFacade";
import { ObjectId } from "mongodb";

interface CreateArgs {
    email: string;
    password: string;
}

export default class UserRepository {
    private model: any;
    constructor() {
        this.model = mongoose.model("users", UserSchema);
    }

    async create(args: CreateArgs) {
        const entity = new this.model();
        Object.assign(entity, args);
        await entity.save();
    }

    async find(email: string): Promise<UserFacade | null> {
        const user = await this.model.findOne({ email }).lean();
        if (!user) {
            return null;
        }
        return new UserFacade(user);
    }

    async update(id: string, data: Partial<IUser>) {
        return this.model.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: data,
            },
        );
    }
}
