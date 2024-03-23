import { Request, Response } from "express";

export function viewReferences (req: Request, res: Response) {
    try {

    }
    catch (error) {
        res.status(500).json({errorMessage: error});
    }
}