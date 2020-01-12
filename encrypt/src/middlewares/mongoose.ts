import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.Promise = Promise;
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(String(process.env.MONGODB_URI), { useNewUrlParser: true, useUnifiedTopology: true });

export function ensureConnection() {
    return new Promise((res, rej) => {
        const done = () => res(mongoose);
        if (mongoose.connection.db) {
            return done();
        }
        mongoose.connection.once("open", done);
        mongoose.connection.on("error", rej);
    });
}
