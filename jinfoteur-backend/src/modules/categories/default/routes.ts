import { Router, Request, Response } from "express";
import { businessRouter } from "./business/routes";
import { eventsRouter } from "./events/routes";
import { financialRouter } from "./financial/routes";

const r = Router();

r.use('/business', businessRouter);
r.use('/events', eventsRouter);
r.use('/financial', financialRouter);

export { r as defaultCategoriesRouter };