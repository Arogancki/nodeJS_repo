import { Request, Response } from "express";
import { autobind } from "core-decorators";

export default class HealthController {
    @autobind
    public reportHealthStats(req: Request, res: Response) {
        return res.json({ ok: true });
    }
}
