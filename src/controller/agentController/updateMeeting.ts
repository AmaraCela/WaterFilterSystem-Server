import { Request, Response } from "express";

export function updateMeeting (req: Request, res: Response) {
    const { meetingId, nextDate = null, purchaseMade = false } = req.body;

    try {
        
    }
    catch (error) {
        res.status(500).json({errorMessage: error});
    }
}