import type {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";
import { db } from "../prisma/db.ts";
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
        return next(new BadRequestException("User not found", ErrorCodes.USER_NOT_FOUND));
    }

    return res.status(200).json({ success: true, data: user });
}

export const updateUserById = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {name, email, username, password, avatar, coverImage, bio} = req.body;

    const user = await db.orm.public.User.where({id}).first();

    if(!user){
        return next(new BadRequestException("User not found", ErrorCodes.USER_NOT_FOUND));
    }

    const updatedFields: Record<string, string> = {};
    
    if(name !== undefined) updatedFields.name = name;
    if(email !== undefined) updatedFields.email = email;
    if(username !== undefined) updatedFields.username = username;
    if(password !== undefined) updatedFields.password = await bcrypt.hash(password, 10);
    if(avatar !== undefined) updatedFields.avatar = avatar;
    if(coverImage !== undefined) updatedFields.coverImage = coverImage;
    if(bio !== undefined) updatedFields.bio = bio;


    if(Object.keys(updatedFields).length === 0) {
        return next(new BadRequestException("No fields to update", ErrorCodes.MISSING_REQUIRED_FIELDS));
    }

    const updatedUser = await db.orm.public.User.where({id}).update(updatedFields);

    return res.status(200).json({
        success: true, 
        message: "User updated successfully", 
        data: updatedUser
    });
}

export const deleteUserById = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const {id} = req.params;

    const user = await db.orm.public.User.where({id}).first();

    if(!user){
        return next(new BadRequestException("User not found", ErrorCodes.USER_NOT_FOUND));
    }

    await db.orm.public.User.where({id}).delete();

    return res.status(200).json({
        success: true, 
        message: "User deleted successfully"
    });
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, username, password, avatar, coverImage, bio} = req.body;

    if(!name || !email || !username || !password){
        return next(new BadRequestException("Missing required fields", ErrorCodes.MISSING_REQUIRED_FIELDS));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.orm.public.User.create({
        username,
        email,
        password: hashedPassword,
        name,
        bio,
        avatar,
        coverImage
    });

    return res.status(201).json({
        success: true, 
        message: "User created successfully", 
        data: newUser
    });
}