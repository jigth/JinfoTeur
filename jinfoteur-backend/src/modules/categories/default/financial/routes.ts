import { Router, Request, Response } from "express";

const r = Router();

r.get('/', (req: Request, res: Response) => {
    res.send("Financial Category OK");
})

export { r as financialRouter }
