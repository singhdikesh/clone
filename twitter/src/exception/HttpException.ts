export class HttpException extends Error {
    errorCode: ErrorCodes;
    statusCode: number;
    error: any;
    constructor(message: string, errorCode: ErrorCodes, statusCode: number, error: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.error = error;
        this.name = "HttpException";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INVALID_CREDENTIALS = 1003,
    UNAUTHORIZED = 1004,
    MISSING_REQUIRED_FIELDS = 1005,
}