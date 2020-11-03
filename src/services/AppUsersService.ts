import { NextFunction, Request, Response } from "express";
import { AppUser } from "../models/AppUsers";
import { Language } from "../models/Languages";

export async function list(req: Request, res: Response, next: NextFunction) {
    try {
        let users: AppUser[] = await AppUser.findAll({ 
            where: { isDeleted: false },
            include: [ 
                { model: Language, attributes: [ "id", "name" ] }
            ]
        });
        res.status(200).send(users);
    } catch (error) {
        next({
            statusCode: 400,
            message: error.message
        })
    }
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        if(!req.body.languageId)
            throw new Error("Language is required!");
        else {
            let language = await Language.findOne({ 
                where: {
                    id: req.body.languageId,
                    isDeleted: false
                }
            });
            if(!language) throw new Error("Language not found!");
        }

        let user: AppUser | null = await AppUser.create({
            name: req.body.name,
            password: req.body.password,
            languageId: req.body.languageId
        });

        res.status(201).send(user);
    } catch (error) {
        next({
            statusCode: 400,
            message: error.message
        })
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        let appUser: AppUser | null = await AppUser.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });
        if(!appUser) {
            throw new Error("User not found!");
        }
        if(req.body.languageId) {
            let language = await Language.findOne({ 
                where: {
                    id: req.body.languageId,
                    isDeleted: false
                }
            });
            if(!language) throw new Error("Language not found!");
        }

        let updateCount = await AppUser.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if(updateCount[0] === 0) throw new Error("Error while updating!");

        appUser = await AppUser.findByPk(req.params.id);
        res.status(200).send(appUser);
    } catch (error) {
        next({
            statusCode: 400,
            message: error.message
        })
    }
}

export async function deleteUser(req:Request, res: Response, next: NextFunction) {
    try {
        let appUser: AppUser | null = await AppUser.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });
        if(!appUser) {
            throw new Error("User not found!");
        }

        await AppUser.update({
            isDeleted: true
        }, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).send(appUser);
    } catch (error) {
        next({
            statusCode: 400,
            message: error.message
        });
    }
}