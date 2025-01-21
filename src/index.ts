import dotenv from 'dotenv';
import express, { Express, Request } from 'express';
import morgan from "morgan";
import urlRoutes from './app/routes/url.routes';

dotenv.config();

const app:Express = express();

app.use(express.json());
morgan.token("body", (req: Request) => {
    return JSON.stringify(req.body);
});
morgan.token("params", (req: Request) => {
    return JSON.stringify(req.params) || "-";
});
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms | body: :body | params: :params'
    )
);

app.use("/url", urlRoutes);

const PORT = process.env.EXPRESS_PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
export { app, server };


