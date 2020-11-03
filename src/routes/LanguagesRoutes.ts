import { Express } from 'express'
import { LanguageService } from '../services/_index'

export function routes(app: Express) {
    app.get("/api/languages", LanguageService.list)
    app.post("/api/languages", LanguageService.create)
    app.put("/api/languages/:id", LanguageService.update)
    app.delete("/api/languages/:id", LanguageService.deleteLanguage)
}