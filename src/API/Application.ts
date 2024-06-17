import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import IAPIApplicationOptions from '../Interface/IAPIApplicationOptions';

export default class Application
{
    private baseRoute: string = '/api';
    private express: Express;
    private readonly port: number;
    private apiRouter: any;

    constructor(options: IAPIApplicationOptions = {port: 3001, logRequests: true})
    {
        this.express = express();
        this.port = options.port;

        this.createApiRouter(options.logRequests);
        this.express.use(cors());
        this.express.use(this.baseRoute, this.apiRouter);

        this.listen();
    }

    public router(): Express
    {
        return this.apiRouter;
    }

    private createApiRouter(logRequests: boolean): void
    {
        this.apiRouter = express.Router();
        this.apiRouter.use((req: Request, res: Response, next: any) => {
            if (logRequests) {
                console.log(`API Request received: ${req.path}`)
            }

            res.setHeader('Content-Type', 'application/json');
            next();
        });
    }

    private listen(): void
    {
        this.express.listen(this.port, () => {
            console.log(`API Server running at http://localhost:${this.port}`);
        });
    }
}