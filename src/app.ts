import * as express from 'express'
import { Express } from 'express'
import { json, urlencoded } from 'body-parser'
import * as cors from 'cors'
import * as winston from 'winston'
import * as boom from 'express-boom'
import * as morgan from 'morgan'
import * as routes from './routes/_index'

// winston.add(new winston.transports.File({ filename: 'logfile.log' }));

const PORT: number = 3000

export class Server {
    private app: Express
    constructor() {
        this.app = express()

        // express middlewares
        // this.app.use(cors({
        //     optionSuccessStatus: 200
        // }))
        this.app.use(json())
        this.app.use(boom())
        this.app.use(morgan('combined'))
        this.app.use(urlencoded({
            extended: true
        }))
        this.app.listen(PORT, () => {
            winston.log('info', `--> Server successfully started at port ${PORT}`)
        })
        routes.initRoutes(this.app)
    }
}
new Server()