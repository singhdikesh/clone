import type {Request, Response} from "express";
import bcrypt from "bcrypt";
import { db } from "../prisma/db.ts";


export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await db.orm.public.User.all();

        return res.status(200).json(users);
    }catch(error){
        return res.status(500).json({ error: "Failed to fetch users here" });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try{
        const {name, email, username, password, avatar} = req.body;

        if(!name || !email || !username || !password){
            return res.status(400).json({ error: "Missing required fields" });
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


    }catch(error){
        return res.status(500).json({ error: "Failed to create user" });
    }
}
