import { NextFunction, Request, Response } from "express";
import { AppUser } from "../sqlz/models/appUsers";

export async function list(req: Request, res: Response, next: NextFunction) {
    try {
        let users = await AppUser.findAll();
        res.status(200).send(users);
    } catch (error) {
        next({
            statusCode: 400,
            message: error.message
        })
    }
}

export function create(req: Request, res: Response) {
    res.status(201).send({ user: {} });
}