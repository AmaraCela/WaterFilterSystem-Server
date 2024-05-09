import { Response } from "express";
import { ValidationError } from "sequelize";

export function handleException(res: Response, error: any) {
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

            message = "Invalid input";
        }
    }

    if (Object.keys(errors).length > 0) {
        res.status(400).json({ message: message, errors });
    }
    else {
        res.status(400).json({ message: message });
    }  
}

export function handleInputValidationErrors(req: Request, res: Response, next: any) {
    const { validationResult } = require('express-validator');
    const error = validationResult(req);
    if (!error.isEmpty()) {
        let errors: any = {};

        const errorArray = error.array();
        if (errorArray instanceof Array) {
            errorArray.map(err => {
                if (err.path != null) {
                    errors[err.path] = err.msg;
                }
            });
        }

        res.status(400).json({ message: "Invalid input", errors });
        return;
    }
    next();
}