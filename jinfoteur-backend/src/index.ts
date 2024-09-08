import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { defaultCategoriesRouter } from "./modules/categories/routes";
import { connectMongoDB } from "./shared/infra/mongodb/connection";

// Configs
const app: Express = express();
const port = process.env.PORT || 3000;
connectMongoDB();

// Middlware
app.use(express.json());

// Routes
app.use('/categories', defaultCategoriesRouter);

app.get('/', (req: Request, res: Response) => {
    res.send("<h1>Welcome to the JinfoTeur Backend!</h1>")
});

// Server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


