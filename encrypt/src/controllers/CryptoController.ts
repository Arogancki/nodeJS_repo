import { Response, NextFunction } from "express";
import { autobind } from "core-decorators";
import CryptoService from "../services/CryptoService";
import { RequestWithUser } from "./AuthorizationController";
import validate from "../utils/validate";
import DecryptDto from "../dto/DecryptDto";

interface CryptoControllerArgs {
    cryptoService: CryptoService;
}

export default class CryptoController {
    private readonly cryptoService: CryptoService;
    constructor(args: CryptoControllerArgs) {
        this.cryptoService = args.cryptoService;
    }

    @autobind
    public async encrypt(req: RequestWithUser, res: Response, next: NextFunction) {
        return res.json(await this.cryptoService.encrypt(req.user));
    }

    @autobind
    public async decrypt(req: RequestWithUser, res: Response, next: NextFunction) {
        await validate(req.body, DecryptDto);
        return res.json(await this.cryptoService.decrypt(req.body));
    }

    @autobind
    public async generateKeyPair(req: RequestWithUser, res: Response, next: NextFunction) {
        return res.json(await this.cryptoService.generateKeyPair(req.user));
    }
}
