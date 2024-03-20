import { Request, Response } from "express";

export function addReference (req: Request, res: Response) {
    const { meetingId, phoneNumber, profession, qualified, name, surname } = req.body;
    try {
        // const response = Reference.add();
        res.status(201).json({successfulMessage: 'Reference added successfully'});
    }
    catch (error) {
        res.status(500).json({errorMessage: error});
    }
}