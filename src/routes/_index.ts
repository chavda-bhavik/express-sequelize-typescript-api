import { Express, Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as winston from 'winston'
import * as AppUsersRoutes from './appUsersRoutes'

interface ErrorType {
    statusCode: number
    message: string
}

export function initRoutes(app: Express) {
    winston.log('info', 'routes initialize');
    
    app.get('/api', (req:Request, res:Response) => {
        res.status(200).send({ message: 'Server is running!' })
    })

    AppUsersRoutes.routes(app);

    app.use((err: ErrorType, req:Request, res:Response, next: NextFunction) => {
        if(err) {
            res.setHeader('Content-type', 'application/json');
            res.statusCode = err.statusCode
            res.end(JSON.stringify({message: err.message}));
        }
    })
    app.all('*', (req:Request, res:Response) => res.boom.notFound())
}