import { Router } from "express";
import { defaultCategoriesRouter } from "./default/routes";

const r = Router();

r.use('/default', defaultCategoriesRouter);

export { r as defaultCategoriesRouter };