import type {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";
import { db } from "../prisma/db.ts";
import type { NextAction } from "@prisma/orm-postgres/utils";
import { BadRequestException } from "../exception/badRequest.ts";
import { ErrorCodes } from "../exception/HttpException.ts";


export const getAllUsers = async (req: Request, res: Response) => {
   const users = await db.orm.public.User.all();
   return res.status(200).json({ success: true, data: users });
}

export const getUserById = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const user = await db.orm.public.User.where({id}).first();

    if(!user){
        next(new BadRequestException("User not found", ErrorCodes.USER_NOT_FOUND));
    }

    return res.status(200).json({ success: true, data: user });
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
        const {name, email, username, password, avatar} = req.body;

        if(!name || !email || !username || !password){
            next(new BadRequestException("Missing required fields", ErrorCodes.MISSING_REQUIRED_FIELDS));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.orm.public.User.create({
            name, 
            email, 
            username, 
            password: hashedPassword, 
            avatar
        });

        return res.status(201).json({
            success: true, 
            message: "User created successfully", 
            data: newUser
        });
}
