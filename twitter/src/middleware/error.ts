import type { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exception/HttpException';

export const errorMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    
    if(error instanceof HttpException) {
        return res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode,
            error: error.error
        });
    }

    return res.status(500).json({
        message: 'Internal Server Error'
    });
}
