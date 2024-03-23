import { Response } from "express";
import { ValidationError } from "sequelize";

export function handleError(res: Response, error: any) {
    let message: any = "Unknown error occurred";
    let errors: any = {};

    if (error instanceof Error) {
        message = error.message;

        if (error instanceof ValidationError) {
            error.errors.map(err => {
                if (err.path != null) {
                    errors[err.path] = err.message;
                }
            });

            message = "Validation error occurred";
        }
    }

    if (Object.keys(errors).length > 0) {
        res.status(400).json({ message: message, errors });
    }
    else {
        res.status(400).json({ message: message });
    }  
}