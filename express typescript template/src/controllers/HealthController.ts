import { Request, Response } from "express";

export default class HealthController {
    public reportHealthStats(req: Request, res: Response) {
        return res.json({ ok: true });
    }
}
