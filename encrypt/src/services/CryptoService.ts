import UserService from "./userService";
import { generateKeyPair } from "crypto";
import { promisify } from "util";
import UserFacade from "../facade/UserFacade";
import boom from "boom";
import { config } from "dotenv";
import { readFile } from "fs";
const { Crypt, RSA } = require("hybrid-crypto-js");

config();

interface DecryptArgs {
    message: string;
    privateKey: string;
}

interface CryptoServiceArgs {
    userService: UserService;
}

export default class CryptoService {
    private readonly userService: UserService;
    private readonly crypt = new Crypt({ md: "sha512" });
    private readonly rsa = new RSA({ entropy: String(process.env.KEY_GENERATION_PASSPHRASE) });
    private static generateKeyPair = promisify(generateKeyPair);
    private static readFile = promisify(readFile);

    constructor(args: CryptoServiceArgs) {
        this.userService = args.userService;
    }

    async encrypt(user: UserFacade) {
        if (!user.publicKey) {
            const { output } = boom.badRequest("User have not generated keys yet");
            throw output;
        }
        const { PATH_TO_PDF_FILE } = process.env;
        const file_buffer = await CryptoService.readFile(String(PATH_TO_PDF_FILE));

        return this.crypt.encrypt(user.publicKey, file_buffer);
    }

    async decrypt({ privateKey, message }: DecryptArgs) {
        const decrypted = this.crypt.decrypt(privateKey, message);
        return decrypted.message;
    }

    async generateKeyPair(user: UserFacade) {
        const { publicKey, privateKey } = await this.rsa.generateKeyPairAsync();

        await this.userService.updateUser(user.id, { publicKey });
        return { publicKey, privateKey };
    }
}
