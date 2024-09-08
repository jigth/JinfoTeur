import { Router, Request, Response } from "express";
import categoriesSchema from "../../infra/schema/categories-schema";

const r = Router();

r.get('/', async (req: Request, res: Response) => {
    try {
        const c1 = await categoriesSchema.create({
            name: "c12",
        });

        // const c2 = await categoriesSchema.create({
        //     name: "c2",
        //     parentCategory: c1._id,
        // });
        
        console.log("Everything went nicely");
    } catch (err: unknown) {
        console.log((err as Error).message);
    } finally {
        res.send("Business Category OK");
    }
})

export { r as businessRouter }