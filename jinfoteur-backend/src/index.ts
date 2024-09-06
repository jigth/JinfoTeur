import "dotenv/config";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send("<h1>Welcome to the JinfoTeur Backend!</h1>")
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


