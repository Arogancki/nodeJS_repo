import dotenv from "dotenv";
import expressServerFactory from "./factories/expressServerFactory";
import { DependencyContainer } from "./utils/dependency";

(async function main() {
    dotenv.config();
    await expressServerFactory(DependencyContainer.getInstance().cradle);
})().catch(err => console.log(err));
