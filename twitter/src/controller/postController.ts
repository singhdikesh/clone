import type {NextFunction, Request, Response} from "express";
import { db } from "../prisma/db.ts";
import { BadRequestException } from "../exception/badRequest.ts";
import { ErrorCodes } from "../exception/HttpException.ts";

export const getAllPosts = async (req: Request<{id: string}>, res: Response) => {
    const {id} = req.params;

    const posts = await db.orm.public.Post.where({authorId: id}).all();

    return res.status(200).json({
        success: true, 
        data: posts
    });
}
