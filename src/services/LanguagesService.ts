import { NextFunction, Request, Response } from "express";
import { AppUser } from "../models/AppUsers";
import { Language } from "../models/Languages";

export async function list(req: Request, res: Response, next: NextFunction) {
    try {
        let languages: Language[] = await Language.findAll({ where: { isDeleted: false }});
        res.status(200).send(languages);
    } catch (error) {
        next({
            statusCode: 400,
            message: error.message
        })
    }
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        let language: Language | null = await Language.create({
            name: req.body.name,
        });
        res.status(201).send(language);
    } catch (error) {
        next({
            statusCode: 400,
            message: error.message
        })
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        let language: Language | null = await Language.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });
        if(!language) {
            throw new Error("Language not found!");
        }

        let updateCount = await Language.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if(updateCount[0] === 0) throw new Error("Error while updating!");

        language = await Language.findByPk(req.params.id);
        res.status(200).send(language);
    } catch (error) {
        next({
            statusCode: 400,
            message: error.message
        })
    }
}

export async function deleteLanguage(req:Request, res: Response, next: NextFunction) {
    try {
        let language: Language | null = await Language.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });
        if(!language) {
            throw new Error("Language not found!");
        }

        await Language.update({
            isDeleted: true
        }, {
            where: {
                id: req.params.id
            }
        });
        await AppUser.update({
            isDeleted: true
        }, {
            where: {
                languageId: req.params.id
            }
        })

        res.status(200).send(language);
    } catch (error) {
        next({
            statusCode: 400,
            message: error.message
        });
    }
}