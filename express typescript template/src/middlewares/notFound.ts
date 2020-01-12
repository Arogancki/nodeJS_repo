import _notFound from "boom";
import { Request, Response } from "express";

export function notFound(req: Request, res: Response) {
    const { output } = _notFound.notFound("API Route not found.");
    return res.status(output.statusCode).json(output.payload);
}
