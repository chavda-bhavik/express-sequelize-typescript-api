import { Express } from 'express'
import { UsersService } from '../services/_index'

export function routes(app: Express) {
    app.get("/api/appUsers", UsersService.list)
    app.post("/api/appUsers", UsersService.create)
}